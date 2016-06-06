'use strict';

/**
 * Module Dependencies
 */
 var async  = require('async'),
     stream = require('getstream'),
     streamUtils = require('./../lib/stream_utils');

/**
 * Get following activity for a specific user
 * URL: /following-activity
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @returns {object} Returns a 200 status code with an array of search objects
 */
server.get('/following-activity', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // connect to stream
        function(cb) {

            // instantiate a new client (server side)
            var streamClient = stream.connect(config.stream.key, config.stream.secret);

            // instantiate a feed using feed class 'user' and user id from params
            var user = streamClient.feed('timeline_aggregated', params.user_id);

            cb(null, user);

        },

        // get and loop through activities
        function(user, cb) {

            // empty array to hold activities
            var arr = [];

            // get activities from stream
            user.get({ limit: 100 })
                .then(function(stream) {

                    // length of activity results
                    var ln = stream.results.length;

                    // if length is empty, return
                    if (!ln) {
                        res.send(204);
                        return next();
                    }

                    /*
                    * Activities stored in Stream reference user ids and upload ids
                    * We need the full object, not just the reference for the template
                    * The steps below query the DB to translate user:2 into
                    * Something like {'username': 'Nick', 'img':...}
                    */

                    var references = streamUtils.referencesFromActivities(stream.results);
                    streamUtils.loadReferencedObjects(references, params.user_id, function(referencedObjects){
                      streamUtils.enrichActivities(stream.results, referencedObjects);
                      // return the enriched activities
                      cb(null, stream.results);
                    });
                }).catch(function(error) {
                    cb(error);
                });

        },

    // final cb function
    ], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(200, result);
        return next();
    });

});

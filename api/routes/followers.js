'use strict';

/**
 * Module Dependencies
 */
var stream = require('getstream');

/**
 * Creates a following connection
 * URL: /followers
 * Method: POST
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to associate by
 * @param {string} follower_id  This required param specifies the follower id to associate by
 * @returns {object} Returns a 201 status code with the object created
 */
server.post('/followers', function(req, res, next) {

    // extract params from body
    var data = req.body || {};
    data['created_at'] = new Date();

    // execute query using data from body
    db.query('INSERT INTO followers SET ?', data, function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // instantiate a new client (server side)
        var streamClient = stream.connect(config.stream.key, config.stream.secret);

        // instantiate a feed using feed class 'user' and the user id from the database
        var userFeed = streamClient.feed('user', data.user_id);

        // build activity object for stream feed
        var activity = {
            actor: `user:${data.user_id}`,
            verb: 'follow',
            object: `user:${data.follower_id}`,
            foreign_id: `follow:${result.insertId}`,
            time: data['created_at'],
            to: [`notification:${data.follower_id}`]
        };

        // instantiate a feed using feed class 'timeline_flat' and the user id from the database
        var timeline = streamClient.feed('timeline_flat', data.user_id);
            timeline.follow('user_posts', data.follower_id);

        // instantiate a feed using feed class 'timeline_aggregated' and the user id from the database
        var timelineAggregated = streamClient.feed('timeline_aggregated', data.user_id);
            timelineAggregated.follow('user', data.follower_id);

        // add activity to the feed
        userFeed.addActivity(activity)
            .then(function(response) {
                //log.info(response);
            })
            .catch(function(reason) {
                log.error(reason);
                return next(new restify.InternalError(reason.error));
            });

        // send response to client
        res.send(201, Object.assign({ id: result.insertId }, data));
        return next();

    });

});

/**
 * Deletes a following connection
 * URL: /followers
 * Method: DELETE
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @param {string} follower_id  This required param specifies the follower id to filter by
 * @returns {string} Returns a 204 status code
 */
server.del('/followers', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // build sql query
    var sql = 'DELETE FROM followers WHERE user_id = ? AND follower_id = ?';

    // execute sql
    db.query(sql, [params.user_id, params.follower_id], function(err, result) {

        // instantiate a new client (server side)
        var streamClient = stream.connect(config.stream.key, config.stream.secret);

        // instantiate a feed using feed class 'user' and the user id from the database
        var flatFeed = streamClient.feed('timeline_flat', params.user_id);
        var aggregatedFeed = streamClient.feed('timeline_aggregated', params.user_id);

        // stop following user
        flatFeed.unfollow('user_posts', params.follower_id);
        aggregatedFeed.unfollow('user', params.follower_id);

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(204);
        return next();

    });

});

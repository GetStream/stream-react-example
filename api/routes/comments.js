'use strict';

/**
 * Module Dependencies
 */
var async  = require('async'),
    stream = require('getstream'),
    jwt    = require('restify-jwt'),
    config = require('../config');

/**
 * Get all comments (optionally for a specific upload id)
 * URL: /comments
 * Method: GET
 * Auth Required: Yes
 * @param {string} upload_id This optional query param specifies an upload id to query by
 * @returns {array} Returns a 200 status code with an array of comment objects
 */
server.get('/comments', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // build base sql statement
    var sql = `
        SELECT
            comments.*,
            users.id AS user_id,
            users.first_name AS first_name,
            users.last_name AS last_name,
            MD5(users.email) AS email_md5
        FROM comments
        LEFT JOIN users ON comments.user_id = users.id
    `;

    // if upload id exists, inject into sql query
    if (params.upload_id) {
        sql += ' WHERE upload_id=?';
    }

    // order by created timestamp
    sql += ' ORDER BY comments.created_at DESC ';

    // execute query
    db.query(sql, [params.upload_id], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send result to client
        res.send(200, result);
        return next();

    });

});

 /**
  * Create a comment for a specific upload
  * URL: /comments
  * Method: POST
  * Auth Required: Yes
  * @param {string} user_id This required param specifies a user id to associate the comment with
  * @param {string} upload_id This required param specifies an upload id to comment on
  * @returns {object} Returns 201 status code with an object of the returned database result
  */
server.post('/comments', function(req, res, next) {

    // extract params from body
    var data = req.body || {};

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // insert comment into database
        function(cb) {

            data['created_at'] = new Date();

            // execute query with data as sanitized values
            db.query('INSERT INTO comments SET ?', data, function(err, comment) {

                if (err) {
                    cb(err);
                }
                // use object assign to merge the object id
                comment = Object.assign({ id: comment.insertId }, data);

                cb(null, comment);

            });

        },

        // get upload associated with comment
        function(comment, cb) {

            // execute query using upload id from previous sql query
            db.query('SELECT user_id FROM uploads WHERE id = ?', [comment.upload_id], function(err, upload) {

                if (err) {
                    cb(err);
                }

                // use object assign to merge objects from previous queries
                var result = Object.assign({ author_id: upload[0].user_id }, comment, upload);

                cb(null, result);

            });

        },

        // submit to stream
        function(result, cb) {

            // instantiate a new client (server side)
            var streamClient = stream.connect(config.stream.key, config.stream.secret);

            // instantiate a feed using feed class 'user' and the user id from the database
            var userFeed = streamClient.feed('user', data.user_id);

            // build activity object for stream feed
            var activity = {
                actor: `user:${data.user_id}`,
                verb: 'comment',
                object: `upload:${data.upload_id}`,
                foreign_id: `comment:${result.id}`,
                time: result.created_at,
                comment: data.comment,
                to: [`notification:${result.author_id}`],
            };

            // add activity to the feed
            userFeed.addActivity(activity)
                .then(function(response) {
                    cb(null, result);
                })
                .catch(function(err) {
                    cb(err);
                });

        }

    // final cb callback
    ], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err));

        }

        // send response to client
        res.send(201, result);
        return next();

    });

});

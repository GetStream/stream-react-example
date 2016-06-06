'use strict';

/**
 * Module Dependencies
 */
var async  = require('async'),
    stream = require('getstream');

/**
 * Get all likes (optionally for a specific user and/or upload)
 * URL: /likes
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @param {string} upload_id This required param specifies the upload id to filter by
 * @returns {object} Returns a 200 status code with an array of like objects
 */
server.get('/likes', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // empty array to hold onto our params for sql query
    var bindings = [];

    // base sql query
    var userSql = '';

    // if a user id was passed in, get all of the likes for that user
    if (params.user_id) {
        userSql += `,IF((SELECT 1 AS liked FROM likes WHERE user_id = ? AND upload_id = ?), true, false) AS liked`;
        bindings.push(params.user_id)
        bindings.push(params.upload_id)
    }

    // create like count sql
    var sql = `
        SELECT
        	COUNT(*) AS likes
        	${userSql}
        FROM likes
    `;

    // if upload id was passed, append query and push upload id into bindings array
    if (params.upload_id) {
        sql += ' WHERE upload_id = ? ';
        bindings.push(params.upload_id)
    }

    db.query(sql, bindings, function(err, result) {
        if (err) {
            log.error(err);
            return next(new restify.InternalError(err.message));
        }
        res.send(200, result[0]);
        return next();
    });

});

 /**
  * Create a likes for a specific upload
  * URL: /likes
  * Method: POST
  * Auth Required: Yes
  * @param {string} user_id This required param specifies the user id to associate with
  * @param {string} upload_id This required param specifies the upload id to associate with
  * @returns {object} Returns a 201 status code with the created object
  */
server.post('/likes', function(req, res, next) {

    // extract params from body
    var data = req.body || {};
    data['created_at'] = new Date();

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // insert like into database
        function(cb) {

            // execute query and use data passed in via body
            db.query('INSERT INTO likes SET ?', data, function(err, like) {

                if (err) {
                    log.error(err);
                    return next(new restify.InternalError(err.message));
                }

                // use object assign to merge row id
                like = Object.assign({ id: like.insertId }, data);

                cb(null, like);

            });

        },

        // get user id from upload
        function(like, cb) {
            db.query('SELECT * FROM uploads WHERE id = ?', [like.upload_id], function(err, upload) {
                if (err) {
                    cb(err);
                }
                cb(null, like, upload);
            });
        },
        // send back in response
        function(like, upload, cb) {
            db.query('SELECT COUNT(*) AS total FROM likes WHERE upload_id = ?', [ like.upload_id ], function(err, count) {
                if (err) {
                    cb(err);
                }
                var result = Object.assign({ id: like.id }, { user_id: upload.user_id }, { likes: count[0].total }, data);
                cb(null, result);
            });

        },

        function(result, cb) {
            db.query('SELECT user_id FROM uploads WHERE id = ?', [ result.upload_id ], function(err, row) {
                if (err) {
                    return cb(err);
                }
                cb(null, Object.assign(result, { to: row[0].user_id }))
            });
        },

        // last cb function
        function(result, cb) {

            // instantiate a new client (server side)
            var streamClient = stream.connect(config.stream.key, config.stream.secret);

            // instantiate a feed using feed class 'user' and the user id from the database
            var userFeed = streamClient.feed('user', data.user_id);

            // build activity object for stream feed
            var activity = {
                actor: `user:${data.user_id}`,
                verb: 'like',
                object: `upload:${data.upload_id}`,
                foreign_id: `like:${result.id}`,
                time: data['created_at'],
                to: [`notification:${result.to}`],
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

/**
 * Delete a like for a specific upload
 * URL: /likes
 * Method: DELETE
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @param {string} upload_id This required param specifies the upload id to filter by
 * @returns {object} Returns a 201 status code
 */
server.del('/likes', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // delete like form database
        function(cb) {

            // execute query
            db.query('DELETE FROM likes WHERE user_id = ? AND upload_id = ?', [ params.user_id, params.upload_id ], function(err, like) {

                if (err) {
                    cb(err);
                }

                cb(null, like);

            });
        },

        // get like count for response
        function(like, cb) {

            // execute query
            db.query('SELECT COUNT(*) AS likes FROM likes WHERE upload_id = ?', [ params.upload_id ], function(err, count) {

                if (err) {
                    cb(err);
                }

                var result = Object.assign(like, count);

                cb(null, result);

            });

        }

// last cb callback
], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err));

        }

        // send response to client
        res.send(200, result[0]);
        return next();

    });

});

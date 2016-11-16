'use strict';

/**
 * Module Dependencies
 */
var knox          = require('knox'),
    uuid          = require('node-uuid'),
    geo           = require('mapbox-geocoding'),
    async         = require('async'),
    stream        = require('getstream'),
    streamUtils   = require('../lib/stream_utils'),
    algoliaSearch = require('algoliasearch');

/**
 * Get uploads based on query
 * URL: /uploads
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @param {string} type This optional param specifies the type to filter by
 * @param {string} query This optional param specifies the query to filter by
 * @returns {object} Returns a 200 status code with an array of upload objects
 */
server.get('/uploads', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // default sql
    var sql = '';

    // if the params type and query are defined, build query for 'type'
    if (params.type && params.query) {

        // check type and build query
        switch (params.type) {
            case 'hashtags':
                sql = `
                    SELECT *
                    FROM uploads
                    WHERE hashtags LIKE '%${params.query.substring(1)}%'
                `;
            break;
            case 'location':
                sql = `
                    SELECT *
                    FROM uploads
                    WHERE location LIKE '%${params.query}%'
                `;
            break;
            case 'user':
                const userName = params.query.split(' ')
                sql = `
                    SELECT *
                    FROM uploads
                    LEFT JOIN users
                    ON uploads.user_id = users.id
                    WHERE users.first_name = ${db.escape(userName[0])}
                        AND CONCAT(SUBSTR(users.last_name, 1, 1), '.') = ${db.escape(userName[1])}
                `;
            break;
        }

        // execute sql query
        db.query(sql, function(err, result) {

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

    // otherwise default to normal query
    } else {

        // async waterfall (see: https://github.com/caolan/async)
        async.waterfall([

            // connect to stream
            function(cb) {

                // instantiate a new client (server side)
                var streamClient = stream.connect(config.stream.key, config.stream.secret);

                // instantiate a feed using feed class 'timeline_flat' and user id from params
                var timelineFlatFeed = streamClient.feed('timeline_flat', params.user_id);

                cb(null, timelineFlatFeed);

            },

            // get and loop through activities
            function(timelineFlatFeed, cb) {

                // build query params for stream (id_lt is preferred)
                var uploadGetParams = { limit: 5, }
                if (params.last_id) uploadGetParams.id_lt = params.last_id

                // get activities from stream
                timelineFlatFeed.get(uploadGetParams)
                    .then(function(stream) {

                        // length of activity results
                        var ln = stream.results.length;

                        // exit if length is zero
                        if (!ln) {
                            res.send(204);
                            return next();
                        }

                        // enrich the activities
                        var references = streamUtils.referencesFromActivities(stream.results);
                        streamUtils.loadReferencedObjects(references, params.user_id, function(referencedObjects) {
                            streamUtils.enrichActivities(stream.results, referencedObjects);
                            cb(null, stream.results);
                        });

                    })
                    .catch(function(error) {
                        cb(error);
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
            res.send(200, result);
            return next();

        });

    }

});

/**
 * Get uploads based on query
 * URL: /uploads
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @param {string} id This required param specifies the upload id to filter by
 * @returns {object} Returns a 200 status code with the upload object
 */
server.get('/upload', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // build sql statement
    var sql = `
        SELECT
            uploads.*,
            users.id AS user_id,
            MD5(users.email) AS email_md5,
            users.first_name AS first_name,
            users.last_name AS last_name,
            users.fb_uid AS fb_uid,
            IF((SELECT 1 AS liked FROM likes WHERE user_id = ? AND upload_id = uploads.id), true, false) AS liked
        FROM uploads
        LEFT JOIN users
            ON users.id = uploads.user_id
        WHERE uploads.id = ?
        ORDER BY uploads.created_at DESC
    `;

    // execute sql query
    db.query(sql, [params.user_id, params.id], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(200, result[0]);
        return next();

    });

});

/**
 * Upload an image
 * URL: /uploads
 * Method: POST
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to associate the upload with
 * @param {string} caption Caption to associate with the uploaded image
 * @param {string} hashtags Hashtags to associate with the uploaded image
 * @param {string} location Location to associate with the uploaded image
 * @param {object} file This required param specifies the image to upload
 * @returns {object} Returns a 201 status code with the upload object
 */
server.post('/uploads', function(req, res, next) {

    // extract params from body and file from uploaded files
    var data = req.body || {},
        file = req.files || {};

    // generate unique filename using uuid and assign to object
    data.filename = uuid.v4();
    data['created_at'] = new Date();

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // upload file to amazon s3
        function(cb) {

            // initialize knox client
            var knoxClient = knox.createClient({
                key: config.s3.key,
                secret: config.s3.secret,
                bucket: config.s3.bucket
            });

            // send put via knox
            knoxClient.putFile(file.image.path, 'uploads/' + data.filename, {
                'Content-Type': file.image.type,
                'x-amz-acl': 'public-read'
            }, function(err, result) {

                if (err || result.statusCode != 200) {
                    cb(err);
                } else {

                    cb(null);
                }
            });

        },

        // use mapbox to get latitude and longitude
        function(cb) {

            // initialize mapbox client
            geo.setAccessToken(config.mapbox.accessToken);

            // get location data
            geo.geocode('mapbox.places', data.location, function (err, location) {

                if (err) {
                    cb(err);
                } else {

                    // if the location was found
                    if (location.features.length) {

                        // extract coorindates
                        var coords = location.features[0].geometry.coordinates;
                        if (coords.length)  {

                            // assign to latitude and longitude in data object
                            data.longitude = coords[0];
                            data.latitude  = coords[1];

                        }

                    }

                    cb(null)
                }
            });

        },

        // insert record into database
        function(cb) {

            // run query using node mysql, passing the data object as params
            db.query('INSERT INTO uploads SET ?', data, function(err, result) {

                if (err) {
                    cb(err);
                } else {

                    // use object assign to merge the object id
                    result = Object.assign({}, { id: result.insertId }, data);

                    cb(null, result);
                }
            });

        },

        // submit to algolia for indexing
        function(result, cb) {

            // initialize algolia
            var algolia = algoliaSearch(config.algolia.appId, config.algolia.apiKey);

            // initialize algoia index
            var index = algolia.initIndex('cabin');

            // add returned database object for indexing
            index.addObject(result);

            cb(null, result);

        },

        // submit to stream
        function(result, cb) {

            // instantiate a new client (server side)
            var streamClient = stream.connect(config.stream.key, config.stream.secret);

            // build activity object for stream feed
            var activity = {
                actor: `user:${data.user_id}`,
                verb: 'add',
                object: `upload:${result.id}`,
                foreign_id: `upload:${result.id}`,
                time: data['created_at']
            };

            // instantiate a feed using feed class 'user_posts' and the user id from the database
            var userFeed = streamClient.feed('user_posts', data.user_id);

            // add activity to the feed
            userFeed.addActivity(activity)
                .then(function(response) {
                    cb(null, result);
                })
                .catch(function(err) {
                    cb(err);
                });

        }

    // final cb function
    ], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err));

        }

        // respond to client with result from database
        res.send(201, result);
        return next();

    });

});

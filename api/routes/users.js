'use strict';

/**
 * Module Dependencies
 */
var stream        = require('getstream'),
    jwt           = require('jsonwebtoken'),
    async         = require('async'),
    FB            = require('fb'),
    algoliaSearch = require('algoliasearch');

/**
 * Get user by id
 * URL: /users/:id
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @returns {object} Returns a 200 status code with the user object
 */
server.get('/users/:id', function(req, res, next) {

    // extract params
    var params = req.params || {};

    // empty array to hold bindings
    var bindings = [];

    // base sql query
    var sql = '';

    // if a user id exists
    if (params.user_id) {

        // build sql query
        sql = `
            SELECT
                users.id AS id,
                users.fb_uid AS fb_uid,
                users.first_name AS first_name,
                users.last_name AS last_name,
                MD5(users.email) AS email_md5,
                users.created_at AS created_at,
                users.modified_at AS modified_at,
                IF(
                    (SELECT
                            1 AS following
                        FROM followers
                        WHERE user_id = ?
                            AND follower_id = users.id
                    ),
                    true, false
                ) AS following,
                IF(
                    (SELECT
                            1 AS following
                        FROM followers
                        WHERE follower_id = ?
                            AND user_id = users.id
                    ),
                    true, false
                ) AS follower,
                (SELECT COUNT(id) FROM followers WHERE user_id = users.id) AS following_count,
                (SELECT COUNT(id) FROM followers WHERE follower_id = ?) AS follower_count
            FROM users

            WHERE id = ?
                OR fb_uid = ?
                OR email = ?
        `;

        // push query params into bindings array
        bindings = [params.user_id, params.user_id, params.id, params.id, params.id, params.id];

    // select user based off of provided fb_uid or email
    } else {

        // build sql
        sql = `
            SELECT
                users.id AS id,
                users.fb_uid AS fb_uid,
                users.first_name AS first_name,
                users.last_name AS last_name,
                MD5(users.email) AS email_md5,
                users.created_at AS created_at,
                users.modified_at AS modified_at
            FROM users
            WHERE id = ?
                OR fb_uid = ?
                OR email = ?
        `;

        // push query params into bindings array
        bindings = [params.id, params.id, params.id];

    }

    // execute query
    db.query(sql, bindings, function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // use object.assign to merge stream tokens
        result = Object.assign({}, result[0]);

        // send response to client
        res.send(200, result);
        return next();

    });

});

/**
 * Create user or return the user object if they already exist
 * URL: /users
 * Method: POST
 * Auth Required: Yes
 * @param {string} fb_uid A unique Facebook user id to associate with the user (aka app specific fb uid)
 * @param {string} first_name The users first name
 * @param {string} last_name The users last name
 * @param {string} email A unique email address to associate with the user
 * @returns {object} Returns a 201 or 200 status code with the user object
 */
server.post('/users', function(req, res, next) {

    // extract data from body
    var data = req.body || {};
    var fbUserId = data.fb_user_id;
    var accessToken = data.token;
    var options = {
        appId   : '1714548178824131',
        xfbml   : true,
        version : 'v2.6',
        status  : true,
        cookie  : true,
    };
    var fb = new FB.Facebook(options);
    fb.setAccessToken(accessToken);

    async.waterfall([

       function (cb) {
            // query the userdata from FB
            fb.api('/me', 'get', { fields: 'id,name,email, first_name, last_name' }, function(facebookUserData) {
                cb(null, facebookUserData);
            });
        },

        function(facebookUserData, cb) {

          // build the data we're going to insert
          var data = {};
              data.email = facebookUserData.email;
              data.fb_uid = facebookUserData.id;
              data.first_name = facebookUserData.first_name;
              data.last_name = facebookUserData.last_name;

          // try select first
          db.query('SELECT * FROM users WHERE email=' + db.escape(data.email), function(err, result) {

              if (err) {
                  log.error(err);
                  return next(new restify.InternalError(err.message));
              }

              // instantiate a new client (server side)
              var streamClient = stream.connect(config.stream.key, config.stream.secret);

              // generate jwt
              var jwtToken = jwt.sign({
                  request: {
                      email: data.email
                  }
              }, config.jwt.secret);

              // if user exists, return result
              if (result.length) {

                  var userId = result[0].id;

                  // get tokens from stream client
                  var tokens = {
                      timeline: {
                          flat: streamClient.getReadOnlyToken('timeline_flat', userId),
                          aggregated: streamClient.getReadOnlyToken('timeline_aggregrated', userId),
                      },
                      notification : streamClient.getReadOnlyToken('notification', userId),
                  };

                  // user object.assign to insert tokens from stream and jwt
                  result = Object.assign({}, result[0], { tokens: tokens }, { jwt: jwtToken });

                  // send response to client
                  res.send(200, result);
                  return next();

              }

              // execute query
              db.query('INSERT INTO users SET ?', data, function(err, result) {

                  if (err) {
                      log.error(err);
                      return next(new restify.InternalError(err.message));
                  }

                  // user object.assign to insert new row id and tokens from stream
                  result = Object.assign({}, { id: result.insertId }, data, tokens);

                  // initialize algolia
                  var algolia = algoliaSearch(config.algolia.appId, config.algolia.apiKey);

                  // initialize algoia index
                  var index = algolia.initIndex('cabin');

                  // add returned database object for indexing
                  index.addObject(result);

                  // use object.assign insert jwt
                  result = Object.assign({}, result, { jwt: jwtToken });

                  var userId = result.id;

                  // auto follow user id 1 (a.k.a stream cabin)
                  db.query('INSERT INTO followers SET user_id=?, follower_id=?', [userId, 1], function(err, result) {

                      // instantiate a new client (server side)
                      var streamClient = stream.connect(config.stream.key, config.stream.secret);

                      // instantiate a feed using feed class 'user' and the user id from the database
                      var userFeed = streamClient.feed('user', userId);

                      // build activity object for stream feed
                      var activity = {
                          actor: `user:${userId}`,
                          verb: 'follow',
                          object: `user:${1}`,
                          foreign_id: `follow:${userId}`,
                          time: data['created_at'],
                          to: [`notification:${1}`]
                      };

                      // instantiate a feed using feed class 'timeline_flat' and the user id from the database
                      var timeline = streamClient.feed('timeline_flat', userId);
                          timeline.follow('user_posts', 1);

                      // instantiate a feed using feed class 'timeline_aggregated' and the user id from the database
                      var timelineAggregated = streamClient.feed('timeline_aggregated', userId);
                          timelineAggregated.follow('user', 1);

                      // add activity to the feed
                      userFeed.addActivity(activity)
                          .then(function(response) {

                              // send response to client
                              res.send(201, result);
                              return next();

                          })
                          .catch(function(reason) {
                              log.error(reason);
                              return next(new restify.InternalError(reason.error));
                          });

                  });

              });

          });
      }]);
});

/**
 * Delete an existing user
 * URL: /users
 * Method: DELETE
 * Auth Required: Yes
 * @param {string} user_id A unique database user id to to delete
 * @returns {object} Returns a 204 status code
 */
server.del('/users/:user_id', function(req, res, next) {

    var params = req.params || {};

    db.query('DELETE FROM users WHERE id = ?', [params.user_id], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        res.send(204);
        return next();

    });

});

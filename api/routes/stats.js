/**
 * Module Dependencies
 */
var async = require('async'),
    Keen = require('keen.io');
/**
 * Upload an image
 * URL: /uploads
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @returns {object} Returns a 201 status code with the upload object
 */
server.get('/stats/:user_id', function(req, res, next) {

    // extract query params
    var params = req.params || {};
    var userId = params.user_id;

    // async waterfall (see: https://github.com/caolan/async)
    async.waterfall([

        // keen query
        function(cb) {

            //  configure instance of keenClient
            var keenClient = Keen.configure({
                projectId: config.keen.projectId,
                writeKey: config.keen.writeKey,
                readKey: config.keen.readKey,
                masterKey: config.keen.masterKey,
            });

            // build query
            var keenQuery = new Keen.Query("count", {
                event_collection: 'views',
                timeframe: 'this_30_days',
                group_by: "postId",
                filters: [{
                    property_name: 'postAuthorId',
                    operator: 'eq',
                    property_value: userId,
                }]
            });

            // run query
            keenClient.run(keenQuery, function(err, res) {

                if (err) {
                    cb(err);
                }

                function compareItems(a, b) {
                    return (a['result'] - b['result']) * -1;
                }

                var sortedItems = res.result;
                    sortedItems.sort(compareItems);

                var topItems = sortedItems.slice(0, 5);
                var postIds = [];
                var postViewCounts = {};

                // loop through top items
                topItems.forEach(function(value) {
                    postIds.push(value['postId'])
                    postViewCounts[value['postId']] = value['result']
                });

                cb(null, postIds, postViewCounts);

            });

        },

        // database query
        function(postIds, postViewCounts, cb) {

            // run query if we have results
            if (postIds.length == 0) {
              var uploads = [];
              cb(null, uploads);
            } else {
              db.query('SELECT * FROM uploads WHERE id IN (?)', [postIds], function(err, uploads) {

                  if (err) {
                      log.error(err);
                      return next(new restify.InternalError(err.message));
                  }

                  uploads.forEach(function(upload) {
                      upload.viewCount = postViewCounts[upload.id]
                  });

                  function compareUploads(a, b) {
                      return (a['viewCount'] - b['viewCount']) * -1;
                  }

                  uploads.sort(compareUploads);

                  cb(null, uploads);

              });
            };

        }

    ], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err));

        }

        // send response to client
        res.send(200, { 'mostViewed': result });
        return next();

    });

});

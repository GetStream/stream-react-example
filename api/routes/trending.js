'use strict';

/**
 * Get trending uploads based on like count
 * URL: /trending
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @returns {object} Returns a 200 status code with an array of upload objects
 */
server.get('/trending', function(req, res, next) {

    // extract params
    var params = req.params || {};

    // build sql query
    var sql = `
        SELECT
            uploads.*,
            COUNT(likes.id) AS likeTotal
        FROM uploads
        LEFT JOIN likes
            ON likes.upload_id = uploads.id
        WHERE uploads.user_id != ?
        GROUP BY uploads.id
        ORDER BY COUNT(likes.id) DESC
    `;

    // execute query
    db.query(sql, [params.user_id], function(err, result) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(200, result)
        return next();

    });

});

'use strict';

 /**
  * Get images for explore page for a specific user
  * URL: /explore
  * Method: GET
  * Auth Required: Yes
  * @param {string} user_id This optional query param specifies an user id to query by
  * @returns {array} Returns a 200 status code with an array of upload (aka explore) objects
  */
server.get('/explore', function(req, res, next) {

    // extract query params
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
        ORDER BY COUNT(likes.id) ASC
        LIMIT 15
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

})

'use strict';

/**
 * Get uploads based on location
 * URL: /locations
 * Method: GET
 * Auth Required: Yes
 * @param {string} location This required param specifies the location to filter by
 * @returns {object} Returns a 200 status code with an array of search objects
 */
server.get('/locations', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // if params don't exist, respond with empty object
    if (!params.q) {
        res.send(200, []);
        return next();
    }

    // build sql query
    var sql = `
        SELECT *
        FROM uploads
        WHERE location LIKE ?
        ORDER BY created_at DESC
    `;

    // build query
    db.query(sql, [params.q], function(err, result) {

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

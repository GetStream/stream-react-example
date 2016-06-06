'use strict';

/**
 * Get contributions for a specific user
 * URL: /contributions
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This optional query param specifies an user id to query by
 * @returns {array} Returns a 200 status code with an array of upload (aka contribution) objects
 */
server.get('/contributions', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // execute query
    db.query('SELECT * FROM uploads WHERE user_id = ? ORDER BY created_at DESC', [params.user_id], function(err, result) {

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

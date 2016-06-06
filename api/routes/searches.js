'use strict';

/**
 * Get all searches performed by a user (aka search history)
 * URL: /searches
 * Method: GET
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to filter by
 * @returns {object} Returns a 200 status code with an array of search objects
 */
server.get('/searches', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    // build sql query
    var sql = `
        SELECT
            search,
            created_at
        FROM searches
        WHERE searches.user_id = ?
            GROUP BY searches.search
        ORDER BY created_at DESC
        LIMIT 10
    `;

    // execute query
    db.query(sql, [ params.user_id ], function(err, results) {

        // catch all errors
        if (err) {

            // use global logger to log to console
            log.error(err);

            // return error message to client
            return next(new restify.InternalError(err.message));

        }

        // send response to client
        res.send(200, results);
        return next();

    });

});

/**
 * Create a search record for history lookup
 * URL: /searches
 * Method: POST
 * Auth Required: Yes
 * @param {string} user_id This required param specifies the user id to associate search with
 * @param {string} search This required param specifies the search value
 * @returns {object} Returns a 200 status code with an array of search objects
 */
server.post('/searches', function(req, res, next) {

    // extract params from body
    var data = req.body || {};

    // execute query using data from body
    db.query('INSERT INTO searches SET ?', data, function(err, result) {

        if (err) {
            log.error(err);
            return next(new restify.InternalError(err.message));
        }

        // user object.assign to inject new record id
        result = Object.assign({ id: result.insertId }, data);

        // send response to client
        res.send(201, result);
        return next();

    });

});

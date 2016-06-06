'use strict';

server.get('/active', function(req, res, next) {

    // extract query params
    var params = req.params || {};

    var sql = `
        SELECT
            users.id AS id,
            users.first_name AS first_name,
            users.last_name AS last_name,
            MD5(users.email) AS email_md5,
            users.created_at AS created_at,
            users.modified_at AS modified_at,
            COUNT(uploads.user_id) as posts,

            (SELECT id FROM followers WHERE followers.user_id = ? AND followers.follower_id = users.id) AS following

        FROM users
        LEFT JOIN
            uploads
            ON uploads.user_id = users.id

        WHERE users.id != ?

        GROUP BY uploads.user_id, users.id
        HAVING posts > 0 AND following IS NULL
        ORDER BY posts DESC
        LIMIT 3
    `;

    db.query(sql, [params.user_id, params.user_id], function(err, result) {

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


});

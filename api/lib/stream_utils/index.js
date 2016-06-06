'use strict';
var async = require('async');

function referencesFromActivities(activitiesOrNotifications) {
    /*
  Returns the references from a list of activities
  */
    var references = {}
    activitiesOrNotifications.forEach(function(item) {
        var activities = (item.activities) ? item.activities : [
            item
        ];
        activities.forEach(function(activity) {
            Object.keys(activity).forEach(function(key) {
                if (activity[key] && activity[key].indexOf && activity[key].indexOf(':') != -1) {
                    var parts = activity[key].split(':');
                    var reference = parts[0];
                    var referenceId = parts[1];
                    if (!(reference in references)) {
                        references[reference] = {};
                    }
                    references[reference][
                        referenceId
                    ] = 1;
                }
            });
        });
    });
    return references;
};

function loadReferencedObjects(references, userId, callback) {
    // TODO: subqueries are inneficient. Handle do i like and do i follow
    // in 2 separate queries
    var queries = [];
    if (references.upload) {
        let sql = `
        SELECT
            uploads.id AS id,
            users.id AS user_id,
            users.first_name AS first_name,
            users.last_name AS last_name,
            MD5(users.email) AS email_md5,
            uploads.id AS upload_id,
            uploads.filename AS filename,
            uploads.hashtags AS hashtags,
            uploads.caption AS caption,
            uploads.location AS location,
            IF((SELECT 1 AS liked FROM likes WHERE user_id = ? AND upload_id = uploads.id), true, false) AS liked
        FROM uploads
            LEFT JOIN users ON (uploads.user_id = users.id)
        WHERE uploads.id IN (?)
    `;
        queries.push({
            'name': 'upload',
            'sql': sql
        });
    }
    if (references.user) {
        // do the same thing for users
        let sql = `
        SELECT
            users.id AS id,
            users.id AS user_id,
            users.first_name AS first_name,
            users.last_name AS last_name,
            MD5(users.email) AS email_md5,
            IF(
                (
                    SELECT
                        1 AS following
                    FROM followers AS f
                    WHERE f.follower_id = users.id
                        AND f.user_id = ?
                ),
                true,
                false
            ) AS following
        FROM users
        WHERE users.id IN (?)
    `;
        queries.push({
            'name': 'user',
            'sql': sql
        });
    }
    var referencedObject = {};
    // run all the queries
    async.eachSeries(queries, function iteratee(query, cb) {
        db.query(query.sql, [userId, Object.keys(references[query.name])], function(err, results) {
            if (err) {
                cb(err);
            }
            referencedObject[query.name] = {};
            results.forEach(function(result) {
                referencedObject[query.name][result.id] = result;
            });
            cb();
        });
    }, function done() {
        callback(referencedObject);
    });
}

function enrichActivities(activitiesOrNotifications, refencedObjects) {
    /*
     * Enriches the activities by replacing references with the actual objects
     */
    activitiesOrNotifications.forEach(function(item) {
        var activities = (item.activities) ? item.activities : [item];
        activities.forEach(function(activity) {
            Object.keys(activity).forEach(function(key) {
                if (activity[key] && activity[key].indexOf && activity[key].indexOf(':') != -1) {
                    var parts = activity[key].split(':');
                    var reference = parts[0];
                    var referenceId = parts[1];
                    if (reference in refencedObjects && refencedObjects[reference][referenceId]) {
                        activity[key] = refencedObjects[reference][referenceId];
                    }
                }
            });
        });
    });
};

module.exports = {
    'referencesFromActivities': referencesFromActivities,
    'loadReferencedObjects': loadReferencedObjects,
    'enrichActivities': enrichActivities
};

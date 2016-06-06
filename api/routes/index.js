'use strict';

/**
 * Catch All
 */
server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});

/**
 * Routes
 */
require('./active');
require('./comments');
require('./followers');
require('./likes');
require('./searches');
require('./uploads');
require('./users');
require('./explore');
require('./trending');
require('./locations');
require('./contributions');
require('./stats');
require('./following-activity');
require('./incoming-activity');

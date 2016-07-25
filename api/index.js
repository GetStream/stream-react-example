'use strict';

/**
 * Module Dependencies
 */
var config        = require('./config'),
    bunyan        = require('bunyan'),
    winston       = require('winston'),
    bunyanWinston = require('bunyan-winston-adapter'),
    mysql         = require('mysql'),
    jwt           = require('restify-jwt'),
    Mail          = require('winston-mail').Mail,
    Sentry        = require('winston-sentry');

/**
 * Global Dependencies
 */
global.__base  = __dirname + '/';
global.config  = require('./config.js');
global.restify = require('restify');

/**
 * Transports (Logging)
 */
var transports = [
    new winston.transports.Console({
        level: 'info',
        timestamp: function() {
            return new Date().toString();
        },
        json: true
    })
];

/**
 * Sentry Transport (Logging)
 */
if (process.env.SENTRY) {
    new winston.transports.Console({ level: 'silly' }),
    new Sentry({
        patchGlobal: true,
        dsn: process.env.SENTRY,
    })
}

/**
 * Logging
 */
global.log = new winston.Logger({
    transports: transports
});

/**
 * Initialize Server
 */
global.server = restify.createServer({
    name    : config.name,
    version : config.version,
    log     : bunyanWinston.createAdapter(log),
});

/**
 * Middleware
 */
server.use(restify.bodyParser());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: true }));
server.pre(require('./lib/cors')());
server.use(restify.fullResponse());
server.use(jwt({ secret: config.jwt.secret }).unless({
    path: ['/users']
}));

/**
 * Initialize MySQL Connection
 */
global.db = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.username,
    password : config.db.password,
    database : config.db.name,
    timezone: 'UTC'
});
db.connect();

db.query(`
    SET sql_mode = "STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
`)

/**
 * Boot
 */
server.listen(config.port, function () {
    require('./routes');
    log.info(
        '%s v%s ready to accept connections on port listening on port %s in %s environment',
        server.name,
        config.version,
        config.port,
        config.env
    );
});

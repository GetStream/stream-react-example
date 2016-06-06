'use strict';

function cors(options) {

    const defaultAllowHeaders = ['Authorization', 'Content-Type'];
	const defaultAllowMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"];

    const opts = Object.assign({}, {
        allowHeaders: defaultAllowHeaders,
        allowMethods: defaultAllowMethods,
        allowOrigins: null,
        allowCreds: true,
    }, options || {});

    const setHeader = (req, res, methods) => {
        const origin = req.headers.origin;
        const requestMethod = req.headers['access-control-request-method'];
        const requestHeaders = req.headers['access-control-request-headers'];

        res.once('header', () => {
            if (opts.allowCreds) res.header('Access-Control-Allow-Credentials', 'true');

            if (opts.allowOrigins) {
                res.header('Access-Control-Allow-Origin',
                    (Array.isArray(opts.allowOrigins)) ? opts.allowOrigins.join(', ') : opts.allowOrigins);
            } else {
                res.header('Access-Control-Allow-Origin', origin);
            }

            res.header('Access-Control-Allow-Methods', opts.allowMethods.join(', '));
            res.header('Access-Control-Allow-Headers', opts.allowHeaders.map(h => h.toUpperCase()).join(', '));
        });
    };

    return (req, res, next) => {
        setHeader(req, res);
        if (req.method == 'OPTIONS') return res.send(200);
        return next();
    };
};

module.exports = cors;

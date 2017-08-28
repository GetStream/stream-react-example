var express = require('express'),
	cors = require('cors'),
	router = express.Router({ strict: true }),
	config = require('../config'),
	MailChimpAPI = require('mailchimp').MailChimpAPI;

/* GET home */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Cabin: React Example App by Stream' });
});

/* GET demo */
router.get('/demo', function(req, res, next) {
	res.render('demo', { title: 'Cabin: React Example App by Stream' });
});

router.get('/demo/', function(req, res, next) {
	res.redirect(302, '/demo');
});

/* POST mailchimp */
router.post(
	'/subscribe',
	cors({ origin: 'https://getstream.io/blog' }),
	function(req, res, next) {
		var params = req.body;

		var api = new MailChimpAPI(config.mailchimp.apiKey, { version: '2.0' });

		api.call(
			'lists',
			'subscribe',
			{
				id: config.mailchimp.listId,
				email: {
					email: params.email.toLowerCase(),
				},
				double_optin: false,
				send_welcome: false,
			},
			function(err, data) {
				res.sendStatus(200).end();
			},
		);
	},
);

module.exports = router;

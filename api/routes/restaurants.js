'use strict';

/**
 * Module Dependencies
 */
var async = require('async');

/**
 * Get restaurant for a specific id
 * URL: /restaurants/:id
 * Method: GET
 * Auth Required: Yes
 * @param {string} id This mandatory query param specifies an restaurant id to query by
 * @returns {array} Returns a 200 status code with an restaurant
 */
server.get('/restaurants/:id', function(req, res, next) {

  // extract query params
  var params = req.params || {};

  // execute query
  async.parallel([
    function(cb) {
      db.query('SELECT * FROM restaurants WHERE id = ? ORDER BY created_at DESC', [params.id], function(err, result) {

        // catch all errors
        if (err) {
          // return error message to client
          cb(err);
        }

        // send response to final function
        cb(null, result);

      });
    },
    function(cb) {
      db.query('SELECT * FROM images WHERE restaurant_id = ? ORDER BY created_at DESC', [params.id], function(err, result) {

        // catch all errors
        if (err) {
          // return error message to client
          cb(err);
        }

        // send response to final function
        cb(null, result);
      });
    }
  ],
  // optional callback
  function(err, results) {
    // catch all errors
    if (err) {

      // use global logger to log to console
      log.error(err);

      // return error message to client
      return next(new restify.InternalError(err.message));

    }
    var images = {};
    if(results[1].length > 0){
      images = {images: results[1]};
    }
    var restaurantData = Object.assign({}, results[0], images);
    res.send(200, restaurantData)
    return next();
  });

});

'use strict';

/**
 * Create an image
 * URL: /images
 * Method: POST
 * Auth Required: Yes
 * @param {string} restaurant_id This required param specifies a restaurant id
 * @param {string} description This required param specifies an image description
 * @param {string} url This required param specifies an image location
 * @returns {object} Returns 201 status code with an object of the returned database result
 */
server.post('/images', function(req, res, next) {

  // extract params from body
  var data = req.body || {};
      data['created_at'] = new Date();

      // execute query with data as sanitized values
      db.query('INSERT INTO images SET ?', data, function(err, image) {

        // use object assign to merge the object id
        image = Object.assign({
          id: image.insertId
        }, data);

        // catch all errors
        if (err) {

          // use global logger to log to console
          log.error(err);

          // return error message to client
          return next(new restify.InternalError(err));

        }

        // send response to client
        res.send(201, image)
        return next();
      });

});

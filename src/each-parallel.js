/*!
 * each-parallel.js
 */


define(function () {


/* -----------------------------------------------------------------------------
 * eachParallel
 * ---------------------------------------------------------------------------*/

/**
 * @public
 * @memberof aflow
 *
 * @desc Applies the function iterator to each item in arr, in parallel. The
 *   iterator is called with an item from the list, and a callback for when it
 *   has finished. If the iterator passes an error to its callback, the main
 *   callback (for the each function) is immediately called with the error.
 *
 *   Note, that since this function applies iterator to each item in parallel,
 *   there is no guarantee that the iterator functions will complete in order.
 *
 * @example
 * aflow.eachParallel([1, 2], function (val, next) {
 *   next(val);
 * }, function (err, results) {
 *   if (err) {
 *     console.log('Bummer dude');
 *   }
 *
 *   doSomething(results[0], results[1]);
 * });
 *
 * @param {array} array - The array to loop through.
 * @param {function} iterator - The iterator called for each item in the array.
 * @param {function} callback - An optional callback to call once all functions
 *   have completed running, or an error has been thrown.
 */
var eachParallel = function (obj, iterator, done) {
  var length = obj.length;
  var results = [];
  var completed = 0;

  var loop = function () {
    for (var i = 0; i < length; i++) {
      iterator(obj[i], callback);
    }
  };

  var callback = function (err) {
    results.push(Array.prototype.slice.call(arguments, 1));
    completed ++;

    if (err || completed === length) {
      done(err, results);
    }
  };

  return length
    ? loop()
    : done(null, results);
};


/* -----------------------------------------------------------------------------
 * expose
 * ---------------------------------------------------------------------------*/

return eachParallel;


});
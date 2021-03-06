/*!
 * parallel.js
 */


define(function () {


/* -----------------------------------------------------------------------------
 * series
 * ---------------------------------------------------------------------------*/

/**
 * @public
 * @memberof aflow
 *
 * @desc Run the functions in the tasks array in parrallel. If any of the
 *   functions pass an error to its callback, the main callback is immediately
 *   called with the value of the error. Once the tasks have completed, the
 *   results are passed to the final callback as an array.
 *
 * @example
 * async.parallel([fn1, fn2], function (err, results) {
 *   if (err) {
 *     console.log('Bummer dude');
 *   }
 *
 *   doSomething(results[0], results[1]);
 * });
 *
 * @param {array} functions - An array or object containing functions to run.
 * @param {function} callback - An optional callback to call once all functions
 *   have completed running, or an error has been thrown.
 */
var parallel = function (functions, done) {
  var length = functions.length;
  var results = [];
  var completed = 0;

  var loop = function () {
    for (var i = 0; i < length; i++) {
      callFn(i);
    }
  };

  var callFn = function (i) {
    functions[i](function (err) {
      results[i] = Array.prototype.slice.call(arguments, 1);
      completed ++;

      if (err || completed === length) {
        done(err, results);
      }
    });
  };

  return length
    ? loop()
    : done(null, results);
};


/* -----------------------------------------------------------------------------
 * expose
 * ---------------------------------------------------------------------------*/

return parallel;


});
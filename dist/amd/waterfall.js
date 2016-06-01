/*!
 * waterfall.js
 */


define(function () {


/* -----------------------------------------------------------------------------
 * waterfall
 * ---------------------------------------------------------------------------*/

/**
 * @public
 * @memberof aflow
 *
 * @desc Runs the tasks array of functions in series, each passing their
 *   results to the next in the array. However, if any of the tasks pass an
 *   error to their own callback, the next function is not executed, and the
 *   main callback is immediately called with the error.
 *
 * @example
 * async.waterfall([fn1, fn2], function (err, results1, results2) {
 *   if (err) {
 *     console.log('Bummer dude');
 *   }
 *
 *   doSomething(results1, results2);
 * });
 *
 * @param {array} functions - An array or object containing functions to run.
 * @param {function} callback - An optional callback to call once all functions
 *   have completed running, or an error has been thrown.
 */
var waterfall = function (functions, done) {
  var length = functions.length,
      i = 0;

  var loop = function (args) {
    functions[i].apply(this, args.concat([callback]));
  };

  var callback = function (err) {
    var args = Array.prototype.slice.call(arguments, 1);

    return (err || i++ === length - 1)
      ? done.apply(this, [err].concat(args))
      : loop(args);    
  };

  return length
    ? loop([])
    : done(null);
};


/* -----------------------------------------------------------------------------
 * expose
 * ---------------------------------------------------------------------------*/

return waterfall;


});
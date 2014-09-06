/*!
 * series.js
 * 
 * Copyright (c) 2014
 */


define(function () {


/* -----------------------------------------------------------------------------
 * series
 * ---------------------------------------------------------------------------*/

/**
 * Run the functions in the tasks array in series, each one running
 * once the previous function has completed. If any functions in the
 * series pass an error to its callback, no more functions are run,
 * and callback is immediately called with the value of the error and
 * current results. Otherwise, callback receives an array of results
 * when tasks have completed.
 *
 * @example
 * async.series([fn1, fn2], function (err, results) {
 *   if (err) {
 *     console.log('Bummer dude');
 *   }
 *
 *   doSomething(results[0], results[1]);
 * });
 *
 * @public
 * @params {array} functions - An array or object containing functions
 *   to run.
 * @params {function} callback - An optional callback to call once all
 *   functions have completed running, or an error has been thrown.
 */
return function (functions, done) {
  var length = functions.length,
      results = [],
      i = 0;

  var loop = function () {
    functions[i](callback);
  };

  var callback = function (err) {
    results.push(Array.prototype.slice.call(arguments, 1));

    return (err || i++ === length - 1)
      ? done(err, results)
      : loop();    
  };

  // start loop
  loop();
};


});
/*!
 * each-series.js
 *
 * Copyright (c) 2014
 */


define(function () {


/* -----------------------------------------------------------------------------
 * series
 * ---------------------------------------------------------------------------*/

/**
 * Iterates over a an array invoking the iterator function for each element.
 * Iterator is run a series, each one running once the previous function has
 * completed. If any functions in the series pass an error to its callback,
 * no more functions are run, and callback is immediately called with the value
 * of the error and current results. Otherwise, callback receives an array of
 * results when tasks have completed.
 *
 * @example
 * aflow.eachSeries([1, 2], function (val, next) {
 *   next(val);
 * }, function (err, results) {
 *   if (err) {
 *     console.log('Bummer dude');
 *   }
 *
 *   doSomething(results[0], results[1]);
 * });
 *
 * @public
 * @params {array} array - The array to loop through.
 * @params {function} iterator - The iterator called for each item in
 *   the array.
 * @params {function} callback - An optional callback to call once all
 *   functions have completed running, or an error has been thrown.
 */
return function (obj, iterator, done) {
  var length = obj.length;
  var results = [];
  var i = 0;

  var loop = function () {
    iterator(obj[i], callback);
  };

  var callback = function (err) {
    results.push(Array.prototype.slice.call(arguments, 1));

    return (err || i++ === length - 1)
      ? done(err, results)
      : loop();
  };

  return length
    ? loop()
    : done(null, results);
};


});
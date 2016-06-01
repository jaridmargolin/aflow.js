(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['aflow'] = factory();
  }
}(this, function () {

/*!
 * parallel.js
 */
var aflow, _parallel_, _series_, _waterfall_, _eachSeries_, _eachParallel_;
_parallel_ = function () {
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
        completed++;
        if (err || completed === length) {
          done(err, results);
        }
      });
    };
    return length ? loop() : done(null, results);
  };
  /* -----------------------------------------------------------------------------
   * expose
   * ---------------------------------------------------------------------------*/
  return parallel;
}();
/*!
 * series.js
 */
_series_ = function () {
  /* -----------------------------------------------------------------------------
   * series
   * ---------------------------------------------------------------------------*/
  /**
   * @public
   * @memberof aflow
   *
   * @desc Run the functions in the tasks array in series, each one running once
   *   the previous function has completed. If any functions in the series pass an
   *   error to its callback, no more functions are run, and callback is
   *   immediately called with the value of the error and current results.
   *   Otherwise, callback receives an array of results when tasks have completed.
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
   * @param {array} functions - An array or object containing functions to run.
   * @param {function} callback - An optional callback to call once all functions
   *   have completed running, or an error has been thrown.
   */
  var series = function (functions, done) {
    var length = functions.length, results = [], i = 0;
    var loop = function () {
      functions[i](callback);
    };
    var callback = function (err) {
      results.push(Array.prototype.slice.call(arguments, 1));
      return err || i++ === length - 1 ? done(err, results) : loop();
    };
    return length ? loop() : done(null, results);
  };
  /* -----------------------------------------------------------------------------
   * expose
   * ---------------------------------------------------------------------------*/
  return series;
}();
/*!
 * waterfall.js
 */
_waterfall_ = function () {
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
    var length = functions.length, i = 0;
    var loop = function (args) {
      functions[i].apply(this, args.concat([callback]));
    };
    var callback = function (err) {
      var args = Array.prototype.slice.call(arguments, 1);
      return err || i++ === length - 1 ? done.apply(this, [err].concat(args)) : loop(args);
    };
    return length ? loop([]) : done(null);
  };
  /* -----------------------------------------------------------------------------
   * expose
   * ---------------------------------------------------------------------------*/
  return waterfall;
}();
/*!
 * each-series.js
 */
_eachSeries_ = function () {
  /* -----------------------------------------------------------------------------
   * series
   * ---------------------------------------------------------------------------*/
  /**
   * @public
   * @memberof aflow
   *
   * @desc Iterates over a an array invoking the iterator function for each
   *   element. Iterator is run a series, each one running once the previous
   *   function has completed. If any functions in the series pass an error to its
   *   callback, no more functions are run, and callback is immediately called
   *   with the value of the error and current results. Otherwise, callback
   *   receives an array of results when tasks have completed.
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
   * @param {array} array - The array to loop through.
   * @param {function} iterator - The iterator called for each item in the array.
   * @param {function} callback - An optional callback to call once all functions
   *   have completed running, or an error has been thrown.
   */
  var eachSeries = function (obj, iterator, done) {
    var length = obj.length;
    var results = [];
    var i = 0;
    var loop = function () {
      iterator(obj[i], callback);
    };
    var callback = function (err) {
      results.push(Array.prototype.slice.call(arguments, 1));
      return err || i++ === length - 1 ? done(err, results) : loop();
    };
    return length ? loop() : done(null, results);
  };
  /* -----------------------------------------------------------------------------
   * expose
   * ---------------------------------------------------------------------------*/
  return eachSeries;
}();
/*!
 * each-parallel.js
 */
_eachParallel_ = function () {
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
        callIterator(i);
      }
    };
    var callIterator = function (i) {
      iterator(obj[i], function (err) {
        results[i] = Array.prototype.slice.call(arguments, 1);
        completed++;
        if (err || completed === length) {
          done(err, results);
        }
      });
    };
    return length ? loop() : done(null, results);
  };
  /* -----------------------------------------------------------------------------
   * expose
   * ---------------------------------------------------------------------------*/
  return eachParallel;
}();
/*!
 * aflow.js
 */
aflow = {
  parallel: _parallel_,
  series: _series_,
  waterfall: _waterfall_,
  eachSeries: _eachSeries_,
  eachParallel: _eachParallel_
};

return aflow;


}));
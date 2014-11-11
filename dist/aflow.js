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
 * 
 * Copyright (c) 2014
 */
var parallel, series, aflow;
parallel = function (functions, done) {
  var length = functions.length;
  var results = [];
  var completed = 0;
  var callback = function (err) {
    results.push(Array.prototype.slice.call(arguments, 1));
    completed++;
    if (err || completed === length) {
      done(err, results);
    }
  };
  for (var i = 0; i < length; i++) {
    functions[i](callback);
  }
};
/*!
 * series.js
 * 
 * Copyright (c) 2014
 */
series = function (functions, done) {
  var length = functions.length, results = [], i = 0;
  var loop = function () {
    functions[i](callback);
  };
  var callback = function (err) {
    results.push(Array.prototype.slice.call(arguments, 1));
    return err || i++ === length - 1 ? done(err, results) : loop();
  };
  // start loop
  loop();
};
/*!
 * aflow.js
 * 
 * Copyright (c) 2014
 */
aflow = {
  parallel: parallel,
  series: series
};

return aflow;


}));
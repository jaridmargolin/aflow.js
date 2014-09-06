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
 * series.js
 * 
 * Copyright (c) 2014
 */
var series, aflow;
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
aflow = { series: series };

return aflow;


}));
/*!
 * aflow.js
 */


define(function (require) {


/* -----------------------------------------------------------------------------
 * aflow
 * ---------------------------------------------------------------------------*/

/**
 * @global
 * @public
 * @namespace aflow
 *
 * @desc Collection of async flow control methods.
 */
return {
  parallel: require('./parallel'),
  series: require('./series'),
  waterfall: require('./waterfall'),
  eachSeries: require('./each-series'),
  eachParallel: require('./each-parallel')
};


});
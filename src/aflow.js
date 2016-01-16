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
  eachSeries: require('./each-series')
};


});
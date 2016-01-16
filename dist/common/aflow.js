/*!
 * aflow.js
 */





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
module.exports = {
  parallel: require('./parallel'),
  series: require('./series'),
  eachSeries: require('./each-series'),
  eachParallel: require('./each-parallel')
};



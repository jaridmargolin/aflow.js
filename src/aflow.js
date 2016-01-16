/*!
 * aflow.js
 */


define([
  './parallel',
  './series',
  './each-series'
], function (parallel, series, eachSeries) {


/* -----------------------------------------------------------------------------
 * aflow
 * ---------------------------------------------------------------------------*/

return {
  parallel: parallel,
  series: series,
  eachSeries: eachSeries
};


});
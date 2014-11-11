/*!
 * aflow.js
 * 
 * Copyright (c) 2014
 */


define([
  './parallel',
  './series'
], function (parallel, series) {


/* -----------------------------------------------------------------------------
 * aflow
 * ---------------------------------------------------------------------------*/

return {
  parallel: parallel,
  series: series
};


});
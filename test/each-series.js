/*!
 * test/parallel.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var eachSeries = require('each-series');


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var iterator = function (val, done) {
  return val === 'fail'
    ? done('fail')
    : done(null, val);
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('each-series.js', function () {

  it('Should call onComplete if array is empty.', function (done) {
    eachSeries([], function () {
      callback(null);
    }, function () {
      done();
    });
  });

  it('Should call onComplete with results.', function () {
    eachSeries([1, 2], iterator, function (err, results) {
      assert.deepEqual(results, [[1], [2]]);
    });
  });

  it('Should call onComplete with error.', function () {
    eachSeries(['fail', 2], iterator, function (err, results) {
      assert.equal(err, 'fail');
    });
  });

});


});
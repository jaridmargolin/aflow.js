/*!
 * test/series.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var series = require('series');


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var fn1 = function (done) {
  return done(null, '1', '2');
};

var fn2 = function (done) {
  return done(null, '3', '4');
};

var fn3 = function (done) {
  return done('fail');
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('series.js', function () {

  it('Should call onComplete with results.', function () {
    series([fn1, fn2], function (err, results) {
      assert.deepEqual(results, [
        ['1', '2'],
        ['3', '4']
      ]);
    });
  });

  it('Should call onComplete with error.', function () {
    series([fn1, fn3], function (err, results) {
      assert.equal(err, 'fail');
    });
  });

});


});
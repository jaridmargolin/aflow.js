/*!
 * test/waterfall.js
 */

define(function (require) {


/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var assert = require('proclaim');
var sinon = require('sinon');
var waterfall = require('waterfall');


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var fn1 = function (done) {
  return done(null, '1', '2');
};

var fn2 = function (arg1, arg2, done) {
  return done(null, arg1, arg2, '3', '4');
};

var fn3 = function (arg1, arg2, done) {
  return done('fail');
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('waterfall.js', function () {

  it('Should call onComplete if array is empty.', function (done) {
    waterfall([], function () {
      done();
    });
  });

  it('Should call onComplete with results.', function () {
    waterfall([fn1, fn2], function (err, arg1, arg2, arg3, arg4) {
      assert.equal(arg1, 1);
      assert.equal(arg2, 2);
      assert.equal(arg3, 3);
      assert.equal(arg4, 4);
    });
  });

  it('Should call onComplete with error.', function () {
    waterfall([fn1, fn3], function (err) {
      assert.equal(err, 'fail');
    });
  });

});


});
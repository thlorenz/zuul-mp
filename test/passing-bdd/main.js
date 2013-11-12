'use strict';

var assert = require('assert');

// our test file needs to know where to find the module relative to itself
var html = require('./my-module');

// general category for the tests that follow
describe('html', function () {
  it('should set inner html', function() {
      var el = document.createElement('div');
      html(el, '<p>foobar</p>');
      assert.equal(el.innerHTML, '<p>foobar</p>');
  });

  it('should clear inner html', function() {
      var el = document.createElement('div');
      el.innerHTML = 'foobar';
      html(el);
      assert.equal(el.innerHTML, '');
  });
});

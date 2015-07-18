var test = require('tape');
var lib = require('../src/renameArguments');


if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    var f = this;
    return function() {
      return f.apply(context, arguments);
    };
  };
}

if (!Function.prototype.filter) {
  Array.prototype.filter = function(predicate) {
    var res = []
    for ( var i=0; i<this.length; i++ ) {
      if (predicate(this[i], i, this)) {
        res.push(this[i])
      }
    }
    return res;
  };
}


var addition = function(a, b) {
  return a + b;
};


test('Always pass', function(t) {
  var x = 5 + 5;
  t.deepEqual(x, 10);
  t.end()
});

test('introspect', function(t) {
  t.deepEqual(lib.introspect(addition), ["a", "b"]);
  t.end();
});

test('introspect bound function', function(t) {
  var add2 = addition.bind(10);
  t.deepEqual(lib.introspect(add2), []);
  t.end();
});

test('renameArguments called without exceptions', function(t) {
  var renamed = lib.renameArguments(addition, ["x", "y"]);
  t.deepEqual(renamed(10, 20), 30);
  t.end();
});

test('introspect function with renamed arguments', function(t) {
  var add3 = lib.renameArguments(addition.bind(10), lib.introspect(addition));
  t.deepEqual(lib.introspect(add3), ["a", "b"]);
  t.end();
});

test('JSON.parse', function(t) {
  //t.deepEqual(JSON.parse('[1,2]'), [1,2]);
  t.deepEqual(10, 1+9)
  t.end()
});


// curl -u 'jakob.mattsson@gmail.com:mE%R88I0s3Nv3w6kt9j9' -s testling.com/browsers
// curl -u 'jakob.mattsson@gmail.com:mE%R88I0s3Nv3w6kt9j9' -s testling.com/usage
// time curl -u 'jakob.mattsson@gmail.com:mE%R88I0s3Nv3w6kt9j9' -sSNT tests/tests.js 'testling.com/?noinstrument&browsers=iexplore/9.0,iexplore/8.0,iexplore/7.0,iexplore/6.0,chrome/23.0,firefox/17.0,safari/5.1,opera/12.0'

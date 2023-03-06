'use strict';
var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var objectCreate = require('../internals/object-create');
var addToUnscopables = require('../internals/add-to-unscopables');

var push = uncurryThis([].push);

// `Array.prototype.group` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true }, {
  group: function group(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var target = objectCreate(null);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var key, value;
    for (;length > index; index++) {
      value = self[index];
      key = toPropertyKey(boundFunction(value, index, O));
      // in some IE10 builds, `hasOwnProperty` returns incorrect result on integer keys
      // but since it's a `null` prototype object, we can safely use `in`
      if (key in target) push(target[key], value);
      else target[key] = [value];
    }
    return target;
  }
});

addToUnscopables('group');

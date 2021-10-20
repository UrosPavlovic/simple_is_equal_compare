// recursive function which checks type, lenght of object keys / array entries, and check values if needed
// alternative for lodash (_) fully covered with tests, which you can run with "npm run test" command

// in your project you will probably use regular syntax like "export default function ... (...args) {...}"
module.exports = function isEqual(val1, val2) {
  if (
    typeof val1 !== typeof val2 ||
    _areObjectBasedButDifferentType(val1, val2)
  ) {
    return false;
  }

  if (_areBothArrays(val1, val2)) {
    if (val1.length !== val2.length) {
      return false;
    }

    return val1.every((el, index) => isEqual(el, val2[index]));
  }

  if (_areBothObjects(val1, val2) || _areBothMaps(val1, val2)) {
    if (Object.keys(val1).length !== Object.keys(val2).length) {
      return false;
    }

    return Object.keys(val1).every((key) => isEqual(val1[key], val2[key]));
  }

  if (_areBothSets(val1, val2)) {
    const [val1Arr, val2Arr] = [Array.from(val1), Array.from(val2)];

    if (Object.keys(val1Arr).length !== Object.keys(val2Arr).length) {
      return false;
    }

    return Object.keys(val1Arr).every((key) =>
      isEqual(val1Arr[key], val2Arr[key])
    );
  }

  return val1 === val2;
}

// private functions

function _areBothArrays(val1, val2) {
  return _isArray(val1) && _isArray(val2);
}

function _areBothObjects(val1, val2) {
  return _isObject(val1) && _isObject(val2);
}

function _areBothSets(val1, val2) {
  return _isSet(val1) && _isSet(val2);
}

function _areBothMaps(val1, val2) {
  return _isMap(val1) && _isMap(val2);
}

// utils

function _isObject(entity) {
  return _getType(entity) === "[object Object]";
}
function _isArray(entity) {
  return _getType(entity) === "[object Array]";
}
function _isSet(entity) {
  return _getType(entity) === "[object Set]";
}
function _isMap(entity) {
  return _getType(entity) === "[object Map]";
}
function _areObjectBasedButDifferentType(entity1, entity2) {
  if (typeof entity1 !== "object" || typeof entity2 !== "object") {
    return false;
  }

  return _getType(entity1) !== _getType(entity2);
}

function _getType(entity) {
  return Object.prototype.toString.call(entity);
}

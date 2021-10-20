// recursive function which checks type, lenght of object keys / array entries, and check values if needed
// alternative for lodash (_) fully covered with tests, which you can run with "npm run test" command

// in your project you will probably use regular syntax like "export default function ... (...args) {...}"
module.exports = function isEqual(ent1, ent2) {
  if (
    typeof ent1 !== typeof ent2 ||
    _areObjectBasedButDifferentType(ent1, ent2)
  ) {
    return false;
  }

  if (_areBothArrays(ent1, ent2)) {
    if (ent1.length !== ent2.length) {
      return false;
    }

    return ent1.every((el, index) => isEqual(el, ent2[index]));
  }

  if (_areBothObjects(ent1, ent2) || _areBothMaps(ent1, ent2)) {
    if (Object.keys(ent1).length !== Object.keys(ent2).length) {
      return false;
    }

    return Object.keys(ent1).every((key) => isEqual(ent1[key], ent2[key]));
  }

  if (_areBothSets(ent1, ent2)) {
    const [ent1Arr, ent2Arr] = [Array.from(ent1), Array.from(ent2)];

    if (Object.keys(ent1Arr).length !== Object.keys(ent2Arr).length) {
      return false;
    }

    return Object.keys(ent1Arr).every((key) =>
      isEqual(ent1Arr[key], ent2Arr[key])
    );
  }

  return ent1 === ent2;
}

// private functions

function _areBothArrays(ent1, ent2) {
  return _isArray(ent1) && _isArray(ent2);
}

function _areBothObjects(ent1, ent2) {
  return _isObject(ent1) && _isObject(ent2);
}

function _areBothSets(ent1, ent2) {
  return _isSet(ent1) && _isSet(ent2);
}

function _areBothMaps(ent1, ent2) {
  return _isMap(ent1) && _isMap(ent2);
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

const _ = require('lodash');

const arrayUtils = require('../../utils/array');
const log = require('../../utils/log');


module.exports = {
  extend: 'apostrophe-module',
  alias: 'aemArrays',
  label: 'AEM Arrays Utils',
  construct,
};


function construct(self, options) {
  self.addHelpers({
    flatten,
    intersect,
    merge,
    splice,
    truncate,
  });

  function flatten(array) {
    // error checks
    if (!Array.isArray(array)) {
      log.warning(
        'flatten() expected an array, but was not provided one.'
        + 'An empty array will be returned.'
      );
      return [];
    }

    return _.flattenDeep(array);
  }

  function intersect(array1, array2) {
    return arrayUtils.intersect(array1, array2);
  }

  function merge(array1, array2) {
    // none is array
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
      log.warning(
        'merge() expected both parameters to be arrays, which is not the case. '
        + 'An empty array will be returned.'
      );
      return [];
    }

    // #1 only is array
    if (Array.isArray(array1) && !Array.isArray(array2)) {
      return array1;
    }

    // #2 only is array
    if (!Array.isArray(array1) && Array.isArray(array2)) {
      return array2;
    }

    // both are arrays
    return [...array1, ...array2 ];
  }

  function splice(array, index, numItemsToDelete) {
    // error checks
    if (!Array.isArray(array)) {
      throw new Error(
        'splice() expected an `array` as first parameter.'
      );
    }

    // warnings
    if (index < 0) {
      log.warning(
        'splice() expected `index` to be a positive integer. '
        + 'The `array` parameter will be returned.'
      );
      return array;
    }

    const deleteCount = numItemsToDelete | 1;
    let clone = array.slice();
    clone.splice(index, deleteCount);

    return clone;
  }

  function truncate(array, length) {
    // error checks
    if (!Array.isArray(array)) {
      throw new Error(
        'truncate() expected an `array` as first parameter.'
      );
    }
    if (typeof length !== 'number') {
      throw new Error(
        'truncate() expected `length` to be a positive integer. '
      );
    }

    if (array.length > length) {
      let clone = array.slice();
      clone.length = length;
      return clone;

    } else {
      return array;
    }
  }
}

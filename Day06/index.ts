// Import
import input from './input';

Object.defineProperty(Array.prototype, 'findMarker', {
  value: function findMarker(windowLength: number): number {
    return this.slice(0).reduce((acc, e, i, array) => {
      const toCheck = array.slice(i, i + windowLength);

      if (toCheck.some((x, i, arr) => arr.indexOf(x) !== i)) {
        return 0;
      }

      array.splice(0); // Breaks the loop
      return i + windowLength;
    }, 0);
  },
  writable: false,
  configurable: false,
  enumerable: false,
});

const solution1 = input.split('').findMarker(4);

const solution2 = input.split('').findMarker(14);

export default {
  solution1,
  solution2,
};

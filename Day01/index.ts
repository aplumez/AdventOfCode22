// Import
import input from './input';

const solution1 = input
  .split('\n\n')
  .map((e) => e.split('\n').map(Number))
  .map((e) => e.reduce((acc, e) => acc + e, 0))
  .sort((a, z) => z - a)
  .shift();

const solution2 = input
  .split('\n\n')
  .map((e) => e.split('\n').map(Number))
  .map((e) => e.reduce((acc, e) => acc + e, 0))
  .sort((a, z) => z - a)
  .splice(0, 3)
  .reduce((acc, e) => acc + e, 0);

export default {
  solution1,
  solution2,
};

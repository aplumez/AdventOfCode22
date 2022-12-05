// Import
import { crates, instructions } from './input';

const transpose = (array: any[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};

const initialCrates = () =>
  transpose(crates.split('\n').map((r) => r.match(/.{1,4}/g))).map((stack) =>
    stack
      .map((crate: string) => crate.replace(/[\s\[\]]/g, ''))
      .filter((x) => x)
      .reverse()
  );

const initialInstructions = instructions.split('\n').map((row) =>
  row
    .split(' ')
    .filter((word) => !isNaN(+word))
    .map((i) => Number(i))
);

const solution1 = initialInstructions
  .reduce((acc, [nb, from, to]) => {
    for (let i = 0; i < nb; i++) {
      acc[to - 1].push(acc[from - 1].pop());
    }
    return acc;
  }, initialCrates())
  .map((e) => e.pop())
  .join('');

const solution2 = initialInstructions
  .reduce((acc, [nb, from, to]) => {
    acc[to - 1].push(...acc[from - 1].splice(acc[from - 1].length - nb, nb));
    return acc;
  }, initialCrates())
  .map((e) => e.pop())
  .join('');

export default {
  solution1,
  solution2,
};

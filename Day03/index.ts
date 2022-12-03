// Import
import input from './input';

const solution1 = input
  .split('\n')
  .map((compartment) => [
    compartment.slice(0, compartment.length / 2),
    compartment.slice(compartment.length / 2),
  ])
  .map(([comp1, comp2]) => [comp1.split('').sort(), comp2.split('').sort()])
  .map(([comp1, comp2]) => [
    comp1,
    comp2,
    comp1.filter((e) => comp2.some((x) => x === e))[0],
  ])
  .map(([a, b, c]) => {
    const t = c as string;
    return t.charCodeAt(0) - (c === t.toUpperCase() ? 38 : 96);
  })
  .reduce((acc, e) => acc + e, 0);

const solution2 = input
  .split('\n')
  .reduce((acc, e, i) => {
    if (i % 3 === 0) {
      acc.push([e]);
    } else {
      acc[acc.length - 1].push(e);
    }
    return acc;
  }, [])
  .map(([comp1, comp2, comp3]) => [
    comp1.split(''),
    comp2.split(''),
    comp3.split(''),
  ])
  .map(([comp1, comp2, comp3]: string[][]) => {
    return comp1.filter(
      (e) => comp2.some((x) => x === e) && comp3.some((y) => y === e)
    )[0];
  })
  .map((a) => a.charCodeAt(0) - (a === a.toUpperCase() ? 38 : 96))
  .reduce((acc, e) => acc + e, 0);

console.log(solution2);

export default {
  solution1,
  solution2,
};

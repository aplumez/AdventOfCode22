// Import
import input from './input';

const solution1 = input
  .split('\n')
  .map((e) => {
    return [
      [
        Number(e.slice(0, e.indexOf('-'))),
        Number(e.slice(e.indexOf(',') + 1, e.lastIndexOf('-'))),
      ],
      [
        Number(e.slice(e.indexOf('-') + 1, e.indexOf(','))),
        Number(e.slice(e.lastIndexOf('-') + 1)),
      ],
    ];
  })
  .map((e) => {
    const deltaA = e[0][0] - e[0][1];
    const deltaB = e[1][0] - e[1][1];

    return (deltaA >= 0 && deltaB <= 0) || (deltaA <= 0 && deltaB >= 0);
  })
  .reduce((acc, e) => acc + (e ? 1 : 0), 0);

const solution2 = input
  .split('\n')
  .map((e) => {
    return [
      [
        Number(e.slice(0, e.indexOf('-'))),
        Number(e.slice(e.indexOf('-') + 1, e.indexOf(','))),
      ],
      [
        Number(e.slice(e.indexOf(',') + 1, e.lastIndexOf('-'))),
        Number(e.slice(e.lastIndexOf('-') + 1)),
      ],
    ];
  })
  .map(([pair1, pair2]) => {
    if (pair2[0] > pair1[1] || pair1[0] > pair2[1]) {
      return 0;
    }

    return 1;
  })
  .reduce((acc, e) => acc + e, 0);

export default {
  solution1,
  solution2,
};

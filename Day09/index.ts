// Import
import input from './input';

interface IPosition {
  x: number;
  y: number;
}

interface IPositionNode {
  head: IPosition;
  tail: IPosition;
}

const isTailAway = (head: IPosition, tail: IPosition) => {
  return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
};

const solution1 = input
  .split('\n')
  // .slice(0, 10)
  .reduce(
    (acc, e) => {
      const [direction, nb] = e.split(' ');

      return [...Array(Number(nb)).keys()].reduce((acc, _) => {
        const lastNode = acc[acc.length - 1];

        let newHead!: IPosition;

        switch (direction) {
          case 'R':
            newHead = {
              x: lastNode.head.x + 1,
              y: lastNode.head.y,
            };
            break;
          case 'L':
            newHead = {
              x: lastNode.head.x - 1,
              y: lastNode.head.y,
            };
            break;
          case 'U':
            newHead = {
              x: lastNode.head.x,
              y: lastNode.head.y + 1,
            };
            break;
          case 'D':
            newHead = {
              x: lastNode.head.x,
              y: lastNode.head.y - 1,
            };
            break;
        }

        const newTail = isTailAway(newHead, lastNode.tail)
          ? { x: lastNode.head.x, y: lastNode.head.y }
          : lastNode.tail;
        acc.push({
          head: newHead,
          tail: newTail,
        });

        return acc;
      }, acc);
    },
    [
      {
        head: {
          x: 0,
          y: 0,
        },
        tail: {
          x: 0,
          y: 0,
        },
      },
    ] as IPositionNode[]
  )
  .map((x) => x.tail)
  .reduce((acc, e) => {
    if (acc.some((x) => x.x === e.x && x.y === e.y)) {
      return acc;
    }

    acc.push(e);
    return acc;
  }, []).length;

const solution2 = input;

export default {
  solution1,
  solution2,
};

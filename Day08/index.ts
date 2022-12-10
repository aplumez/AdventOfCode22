// Import
import input from './input';

interface IPosition {
  x: number;
  y: number;
}

interface IVisibleFrom {
  top: null | boolean;
  right: null | boolean;
  bottom: null | boolean;
  left: null | boolean;
  height: number;
  position: IPosition;
}

enum From {
  BOTTOM = 'bottom',
  RIGHT = 'right',
  TOP = 'top',
  LEFT = 'left',
}

const initialGrid = input.split('\n').map((x, yIndex) =>
  x.split('').map((y, xIndex) => {
    return {
      position: {
        x: xIndex,
        y: yIndex,
      },
      height: Number(y),
      top: null,
      right: null,
      bottom: null,
      left: null,
    } as IVisibleFrom;
  })
);

const transpose = (array: any[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};

const rotateBy90AndComputeVisible = (
  grid: IVisibleFrom[][],
  propertyToUpdate: From
): IVisibleFrom[][] => {
  const baseArray = transpose(grid).map((x) => x.reverse()) as IVisibleFrom[][];

  return baseArray.map((row) => {
    return row.reduce(
      (acc, cell, index) => {
        // First one is always visible
        if (index === 0 || acc.heighest < cell.height) {
          acc.heighest = acc.row[index].height;
          acc.row[index][propertyToUpdate] = true;
          return acc;
        }

        acc.row[index][propertyToUpdate] = false;
        return acc;
      },
      { heighest: 0, row } as { heighest: number; row: IVisibleFrom[] }
    ).row;
  });
};

const solution1 = Object.values(From)
  .reduce((acc, e) => {
    return rotateBy90AndComputeVisible(acc, e);
  }, initialGrid)
  .map((row) => {
    return row.filter((x) => x.left || x.bottom || x.right || x.top).length;
  })
  .reduce((acc, e) => acc + e, 0);

const gridWithScenicScores = initialGrid.reduce((finalArray, row) => {
  const rowWithScenicScores = row.reduce((finalRow, cell) => {
    const cellsToCheck = [
      initialGrid[cell.position.y].slice(0, cell.position.x).reverse(), // All the trees to the left
      initialGrid[cell.position.y].slice(cell.position.x + 1), // All the trees to the right
      [...Array(cell.position.y).keys()]
        .map((y) => initialGrid[y][cell.position.x])
        .reverse(), // All the trees to the top
      [...Array(initialGrid.length - 1 - cell.position.y).keys()].map(
        (y) => initialGrid[y + 1 + cell.position.y][cell.position.x]
      ), // All the trees to the bottom
    ];

    const nbTreesPerDirection = cellsToCheck.map((direction) => {
      let nbTrees = 0;

      for (let tree of direction) {
        nbTrees++;
        if (tree.height < cell.height) {
          continue;
        }

        return nbTrees;
      }

      return nbTrees;
    });

    const scenicScore = nbTreesPerDirection.reduce((acc, e) => acc * e, 1);
    finalRow.push(scenicScore);
    return finalRow;
  }, []);
  finalArray.push(rowWithScenicScores);
  return finalArray;
}, [] as number[][]);

let solution2 = gridWithScenicScores.reduce((acc, e) => {
  const rowHighest = e.reduce((acc, e) => (e > acc ? e : acc), 0);
  return rowHighest > acc ? rowHighest : acc;
}, 0);

export default {
  solution1,
  solution2,
};

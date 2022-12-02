// Import
import input from './input';

const moves = {
  ROCK: {
    opponent: 'A',
    player: {
      value: 'X',
      points: 1,
    },
  },
  PAPER: {
    opponent: 'B',
    player: {
      value: 'Y',
      points: 2,
    },
  },
  SCISSOR: {
    opponent: 'C',
    player: {
      value: 'Z',
      points: 3,
    },
  },
};

const losePoints = 0,
  drawPoints = 3,
  winPoints = 6;

const mapToMove = (move: string, isOpponent: boolean) => {
  if (isOpponent) {
    switch (move) {
      case moves.ROCK.opponent:
        return moves.ROCK;
      case moves.PAPER.opponent:
        return moves.PAPER;
      case moves.SCISSOR.opponent:
        return moves.SCISSOR;
    }
  } else {
    switch (move) {
      case moves.ROCK.player.value:
        return moves.ROCK;
      case moves.PAPER.player.value:
        return moves.PAPER;
      case moves.SCISSOR.player.value:
        return moves.SCISSOR;
    }
  }

  throw new Error(`Unhandled case ${move} - ${isOpponent}`);
};

const winningPairs = [
  [moves.ROCK, moves.PAPER],
  [moves.PAPER, moves.SCISSOR],
  [moves.SCISSOR, moves.ROCK],
];

const getWinningShape = (opponentShape: any) =>
  winningPairs.find((e) => e[0] === opponentShape)[1];

const getLosingShape = (opponentShape: any) => {
  const possibleMoves = [moves.ROCK, moves.PAPER, moves.SCISSOR];

  return possibleMoves.filter((move) => {
    if (move === opponentShape) {
      return 0;
    }

    if (winningPairs.some((e) => e[0] === opponentShape && e[1] === move)) {
      return 0;
    }

    return 1;
  })[0];
};

const mapToMoves = (moves: string[]) => {
  const [opponent, result] = moves;

  const opponentMove = mapToMove(opponent, true);

  switch (result) {
    case 'X': // LOSE
      return [opponentMove, getLosingShape(opponentMove)];
    case 'Y': // DRAW
      return [opponentMove, opponentMove];
    case 'Z': // WIN
      return [opponentMove, getWinningShape(opponentMove)];
  }

  throw new Error('Unhandled case');
};

const computePoints = ([opponent, player]) => {
  const playerBasePoints = player.player.points;
  if (opponent === player) {
    return drawPoints + playerBasePoints;
  }

  if (winningPairs.find((a) => a[0] === opponent && a[1] === player)) {
    return winPoints + playerBasePoints;
  }

  return losePoints + playerBasePoints;
};

const solution1 = input
  .split('\n')
  .map((e) => e.split(' '))
  .map(([opponent, player]) => [
    mapToMove(opponent, true),
    mapToMove(player, false),
  ])
  .map(computePoints)
  .reduce((acc, e) => acc + e, 0);

const solution2 = input
  .split('\n')
  .map((e) => e.split(' '))
  .map(mapToMoves)
  .map(computePoints)
  .reduce((acc, e) => acc + e, 0);

export default {
  solution1,
  solution2,
};

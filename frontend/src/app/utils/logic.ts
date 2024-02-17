import P5 from 'p5';
import { Board } from '../classes/board';
import { Piece } from '../classes/piece';

/**
 * A function to determine valid moves using an option and instances of Classes Piece & Board
 * @param {*} opt A number option that is used in the switch case to determine the valid move.
 * @param {*} piece An instance of the Class Piece.
 * @param {*} game_board An instance of the Class Board.
 * @param {*} x_top The x top axis length declared inside app.ts
 * @param {*} y_bottom The y bottom axis length declared inside app.ts.
 * @returns The piece with changes to all values in the inner array to provide a valid move for a piece.
 */
export const validMove = (
  opt: number,
  piece: Piece,
  game_board: Board,
  x_top: number,
  y_bottom: number
) => {
  return piece.shape.every((row, dy) => {
    return row.every((col, dx) => {
      let x = piece.start_x + dx + piece.rect_xpos;
      let y = piece.start_y + dy + piece.rect_ypos;

      if (opt === 1) {
        //check if block is available to be moved left
        return (
          col === 0 ||
          (x * game_board.xpos > 0 &&
            (y + 1) * game_board.ypos < y_bottom &&
            game_board.grid[y] &&
            game_board.grid[y][x - 1] === 0)
        );
      } else if (opt === 2) {
        //check if available to be moved right
        return (
          col === 0 ||
          ((x + 1) * game_board.xpos < x_top &&
            (y + 1) * game_board.ypos < y_bottom &&
            game_board.grid[y] &&
            game_board.grid[y][x + 1] === 0)
        );
      } else if (opt === 3) {
        //check if available to be moved down
        return (
          col === 0 ||
          ((y + 1) * game_board.ypos < y_bottom &&
            game_board.grid[y + 1] &&
            game_board.grid[y + 1][x] === 0)
        );
      } else if (opt == 4) {
        //check if block is inside canvas.
        return (
          col === 0 ||
          (y * game_board.ypos < y_bottom &&
            game_board.grid[y] &&
            game_board.grid[y][x] === 0)
        );
      } else {
        return;
      }
    });
  });
};

/**
 * A function for setting the rotation of a piece.
 * @param {*} piece Is an instance of the Class Piece. It is to be used with the Class Piece.
 * @param {*} game_board Is an instance of the Class Board. It is used with the Class Board.
 * @return Returns a piece where every value of the inner array is changed to rotate the piece given.
 */
export const rotation = (piece: Piece, game_board: Board) => {
  console.log('rotation fired');

  for (let y = 0; y < piece.shape_repli.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece.shape_repli[x][y], piece.shape_repli[y][x]] = [
        piece.shape_repli[y][x],
        piece.shape_repli[x][y],
      ];
    }
  }
  piece.shape_repli.forEach((row) => row.reverse());

  let value = piece.shape_repli.every((row, dy) => {
    return row.every((col, dx) => {
      let x = piece.start_x + dx + piece.rect_xpos;
      let y = piece.start_y + dy + piece.rect_ypos;
      //console.log(game_Board.grid[y][x])

      return game_board.grid[y] && game_board.grid[y][x] === 0;
    });
  });

  piece.shape_repli.forEach((row) => row.reverse());
  for (let y = 0; y < piece.shape_repli.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece.shape_repli[x][y], piece.shape_repli[y][x]] = [
        piece.shape_repli[y][x],
        piece.shape_repli[x][y],
      ];
    }
  }

  return value;
};

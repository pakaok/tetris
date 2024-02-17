import P5 from 'p5'; // This is a type not a value

import { Piece } from './piece';

const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red',
];

export class Board {
  grid: any[][] = [[]];
  nextBlock: any[] = [];
  row: number = 20;
  col: number = 10;

  x_top: number;
  y_bottom: number;

  xpos: number;
  ypos: number;

  p5: P5;
  linesCleared: number;
  height: number;

  constructor(p5: P5, x_top: number, y_bottom: number, height: number) {
    this.p5 = p5;

    this.x_top = x_top;
    this.y_bottom = y_bottom;

    this.xpos = x_top / this.col;
    this.ypos = y_bottom / this.row;
    this.linesCleared = 0;
    this.height = height;
  }

  emptyBoard = () => {
    return Array.from({ length: this.row }, () => Array(this.col).fill(0));
  };

  reset = () => {
    this.grid = this.emptyBoard();
  };

  blockDraw = () => {
    this.grid.forEach(
      (
        row,
        dy //drawing fixed blocks
      ) =>
        row.forEach((value, dx) => {
          if (value > 0) {
            this.p5.push();
            this.p5.fill(COLORS[value]);
            this.p5.rect(dx * this.xpos, dy * this.ypos, this.xpos, this.ypos);
            this.p5.pop();
          }
        })
    );

    this.nextBlock.forEach(
      (
        row,
        dy //showing next block
      ) =>
        row.forEach((value: any, dx: any) => {
          if (value > 0 && value != 4) {
            this.p5.push();
            this.p5.fill(COLORS[value]);
            this.p5.rect(
              dx * this.xpos + 240,
              dy * this.ypos + 5 * this.height,
              this.xpos,
              this.ypos
            );
            this.p5.pop();
          } else if (value == 4) {
            this.p5.push();
            this.p5.fill(COLORS[value]);
            this.p5.rect(
              dx * this.xpos + 255,
              dy * this.ypos + 5 * this.height,
              this.xpos,
              this.ypos
            );
            this.p5.pop();
          }
        })
    );
  };

  blockFixed = (piece: Piece) => {
    //when dropping block not available to be moved, its fixed
    piece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value > 0) {
          let x = piece.start_x + dx + piece.rect_xpos;
          let y = piece.start_y + dy + piece.rect_ypos;
          this.grid[y][x] = value;
        }
      });
    });
  };

  lineClear = () => {
    //any filled line will be cleared
    let lines = 0;
    this.grid.forEach((row, y) => {
      // If every value is greater than zero then we have a full row.
      if (row.every((value) => value > 0)) {
        lines++;

        // Remove the row.
        this.grid.splice(y, 1);

        // Add zero filled row at the top.
        this.grid.unshift(Array(this.col).fill(0));
        this.linesCleared += 100;
      }
    });
  };
}

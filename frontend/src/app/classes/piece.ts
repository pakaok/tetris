import P5 from 'p5';
import { Board } from './board';

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

export class Piece {
  //Block class that user controls
  shape: any[][] = [[]];
  sh1;
  shape_repli: any[][] = [[]];
  visible = false;
  colour = 'red';

  rect_xpos = 0;
  rect_ypos = 0;

  snum: number = 0;
  start_x: number = 0;
  start_y: number = 0;

  val = true;
  p5: P5;

  constructor(p5: P5) {
    this.colour = 'red';
    this.p5 = p5;
    this.sh1 = Math.floor(Math.random() * (SHAPES.length - 1) + 1);
  }

  spawnPosition = () => {
    //initial position of dropping Block
    this.start_x = 5;
    this.start_y = 0;

    this.snum = this.sh1;
    this.shape = SHAPES[this.snum];

    this.rect_xpos = 0;
    this.rect_ypos = 0;
  };

  block_shape() {
    // randomize a shape of Block
    this.sh1 = Math.floor(Math.random() * (SHAPES.length - 1) + 1);
  }

  spawn = () => {
    // show Block
    this.shape_repli = SHAPES_repli[this.snum];
    this.visible = true;
  };

  draw = (game_board: Board) => {
    //show actual Block during user control, which is all time until game over
    if (this.visible == true) {
      this.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0 && this.val == true) {
            this.p5.push();
            this.p5.fill(COLORS[this.snum]);
            this.p5.rect(
              (this.start_x + x + this.rect_xpos) * game_board.xpos,
              (this.start_y + y + this.rect_ypos) * game_board.ypos,
              game_board.xpos,
              game_board.ypos
            );
            this.p5.pop();
          }
        });
      });
    }
  };
}

const SHAPES = [
  //shapes of block, number represents color
  [],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

const SHAPES_repli = [
  //used for checking whether block is available to be moved
  [],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];

const COLOURS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red',
];

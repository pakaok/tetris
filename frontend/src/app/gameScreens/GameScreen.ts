import P5 from 'p5';
import { Board } from '../classes/board';
import { Piece } from '../classes/piece';
import { validMove } from '../utils/logic';
import { SHAPES_repli2 } from '../utils/shapes';

export interface GameValues {
  width: number;
  height: number;
  x_top: number;
  y_bottom: number;
}

export const drawGameScreen = (
  p5: P5,
  game_board: Board,
  piece: Piece,
  val: GameValues
) => {
  p5.background('gray');
  p5.translate(val.width, val.height);

  game_board.blockDraw();
  game_board.nextBlock = SHAPES_repli2[piece.sh1];
  piece.draw(game_board);
  // Draw borders
  p5.line(0, 0, 0, val.y_bottom);
  p5.line(0, val.y_bottom, val.x_top, val.y_bottom);
  p5.line(val.x_top, val.y_bottom, val.x_top, 0);
  p5.line(val.x_top, 0, 0, 0);

  game_board.lineClear();

  // Use built in frame count in p5.play and spawn/ validate pieces. Not needed while using interval
  // console.log("frame count", p5.frameCount);
  // if (p5.frameCount > 500 && p5.frameCount % 120 == 0) {
  //   if (validMove(3, piece, game_board, val.x_top, val.y_bottom)) {
  //     (piece.rect_ypos += 1), console.log("o");
  //   } else {
  //     piece.visible = false;
  //     game_board.blockFixed(piece);
  //     piece.spawn();
  //   }
  // }

  // if ( milisec % 1000 ){piece.rect_ypos+=1, console.log('o')}

  // game_Board.grid[18]=[1,1,1,1,1,1,1,1,1,1]
  // game_Board.grid[16]=[0,0,0,0,0,1,0,0,0,0]
  // game_Board.grid[14]=[0,0,0,0,0,0,0,1,0,0]
};

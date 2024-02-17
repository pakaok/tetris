import P5, { Element } from 'p5';

// Classes for game
import { Board } from './board';
import { Piece } from './piece';

// Logic for game
import { validMove, rotation } from '../utils/logic';
import { GameState } from '../utils/enums';
import { GameValues } from '../utils/interfaces';
import { drawGameScreen } from '../gameScreens/GameScreen';

// Game size
const canvasWidth = 350; // window.innerWidth / 2;
const canvasHeight = 500; // window.innerHeight * 0.8;

// Block size
const height = 20;
const width = 15;

let timer = 0;

let linesCleared = 0;
let submitLines = false;

let currentScreen = GameState.mainMenu;

// Canvas for positioning as HTML element
let canvas: Element;

export class GameFactory {
  p5: P5;
  runSketch: boolean;

  constructor(p5: P5, runSketch: boolean) {
    this.p5 = p5;
    this.runSketch = runSketch;
  }

  createSketch = () => {
    let y_bottom = canvasHeight - 6 * height;
    let x_top = canvasWidth - 10 * width;

    // Instantiate objects
    let game_board = new Board(this.p5, x_top, y_bottom, height);
    let piece = new Piece(this.p5);

    // Runs once before setup
    this.p5.preload = () => {};

    // Runs once after preload
    this.p5.setup = () => {
      piece.spawnPosition();
      piece.spawn();
      game_board.reset();

      // Create canvas and center regardless of window size
      canvas = this.p5.createCanvas(canvasWidth, canvasHeight);
      // Set id to match div id on index.html page.
      canvas.parent('sketch-holder');

      // console.table(game_board.grid);

      // Spawn a new block
      const setupSpawnInterval = () => {
        //every given time, block is being dropped consistently,
        setInterval(() => {
          //if not available to be dropped, block fixed and spawn new block
          if (
            validMove(3, piece, game_board, x_top, y_bottom) &&
            validMove(4, piece, game_board, x_top, y_bottom)
          ) {
            piece.rect_ypos += 1;
            submitLines = false;
          } else {
            piece.visible = false;
            if (validMove(4, piece, game_board, x_top, y_bottom)) {
              game_board.blockFixed(piece);
              piece.spawnPosition();
              if (validMove(4, piece, game_board, x_top, y_bottom)) {
                piece.spawn();
                piece.block_shape();
              }
            } else if (submitLines == false) {
              submitLines = true;
            }
          }
          linesCleared = game_board.linesCleared;
        }, 500);
      };
      setupSpawnInterval();
    };

    // Runs continuously after setup
    this.p5.draw = () => {
      // Create typed object for function
      const gameValues: GameValues = {
        width: width,
        height: height,
        x_top: x_top,
        y_bottom: y_bottom,
      };

      if (this.runSketch) {
        // Draw game with class instances and values
        drawGameScreen(this.p5, game_board, piece, gameValues);
        textGroup(this.p5);
        keydown(this.p5);
      }
    };

    /**
     * A global function built into the p5.play library. Is called globally when a key is pressed and performs code. Must be declared within sketch.
     */
    this.p5.keyPressed = () => {
      //move left or right
      if (
        this.p5.keyCode === this.p5.LEFT_ARROW &&
        validMove(1, piece, game_board, x_top, y_bottom)
      ) {
        piece.rect_xpos -= 1;
      }
      if (
        this.p5.keyCode === this.p5.RIGHT_ARROW &&
        validMove(2, piece, game_board, x_top, y_bottom)
      ) {
        piece.rect_xpos += 1;
        //console.log(valid())
      }

      if (
        //drop speedy
        this.p5.keyCode === this.p5.DOWN_ARROW &&
        validMove(3, piece, game_board, x_top, y_bottom)
      ) {
        if (timer < 5) {
          piece.rect_ypos += 1;
          timer = 0;
        } else if (!validMove(3, piece, game_board, x_top, y_bottom)) {
          piece.visible = false;

          if (validMove(4, piece, game_board, x_top, y_bottom)) {
            game_board.blockFixed(piece);
            piece.spawnPosition();
            piece.spawn();
            piece.block_shape();
          }
        }
      }

      if (this.p5.keyCode === this.p5.UP_ARROW && rotation(piece, game_board)) {
        //if available, block rotated
        for (let y = 0; y < piece.shape.length; y++) {
          for (let x = 0; x < y; x++) {
            [piece.shape[x][y], piece.shape[y][x]] = [
              piece.shape[y][x],
              piece.shape[x][y],
            ];
          }
        }
        piece.shape.forEach((row) => row.reverse());
        for (let y = 0; y < piece.shape_repli.length; y++) {
          for (let x = 0; x < y; x++) {
            [piece.shape_repli[x][y], piece.shape_repli[y][x]] = [
              piece.shape_repli[y][x],
              piece.shape_repli[x][y],
            ];
          }
        }
        piece.shape_repli.forEach((row) => row.reverse());
      }

      // Escape key press
      if (this.p5.keyCode === this.p5.ESCAPE && this.runSketch) {
        console.log('escape key pressed');
        this.runSketch = false;
      }
    };

    const textGroup = (p5: P5) => {
      //user interface in game frame
      p5.push();
      p5.textAlign(p5.CENTER);
      p5.rectMode(p5.CENTER);
      p5.push();
      p5.noFill();
      p5.rect(
        (canvasWidth + x_top) / 2,
        15 * height - 5,
        75,
        25,
        10,
        10,
        10,
        10
      );
      p5.rect(
        (canvasWidth + x_top) / 2,
        18 * height - 5,
        95,
        25,
        10,
        10,
        10,
        10
      );
      p5.pop();
      p5.textStyle(p5.BOLD);
      p5.textSize(25);
      p5.text(linesCleared, (canvasWidth + x_top) / 2, 2 * height);
      p5.text('1', (canvasWidth + x_top) / 2, 11 * height);
      p5.textSize(15);
      p5.text('Current Score', (canvasWidth + x_top) / 2, 3 * height);
      p5.text('Next Block', (canvasWidth + x_top) / 2, 8 * height);
      p5.text('Level', (canvasWidth + x_top) / 2, 12 * height);
      p5.text('Normal', (canvasWidth + x_top) / 2, 15 * height);
      p5.text('Player mode', (canvasWidth + x_top) / 2, 18 * height);
      //  text(mouseX+','+mouseY, mouseX, mouseY)
      p5.textSize(30);
      p5.text('Group 48', canvasWidth / 2, canvasHeight - 65);
      p5.pop();
    };

    function keydown(p5: P5) {
      // key user interacts with
      if (
        p5.keyIsDown(p5.DOWN_ARROW) &&
        validMove(3, piece, game_board, x_top, y_bottom)
      ) {
        if (timer == 5) {
          piece.rect_ypos += 1;
          timer = 0;
        } else if (!validMove(3, piece, game_board, x_top, y_bottom)) {
          piece.visible = false;

          if (validMove(4, piece, game_board, x_top, y_bottom)) {
            game_board.blockFixed(piece);
            piece.spawnPosition();
            piece.spawn();
            piece.block_shape();
          }
        } else {
          timer += 1;
        }
      }
    }
  };
}

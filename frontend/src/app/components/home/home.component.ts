import { Component, OnInit } from '@angular/core';
import P5 from 'p5';

// Game factory
import { GameFactory } from 'src/app/classes/gameFactory';
import { Settings } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  showPlayButton: boolean = true;
  showExitButton: boolean = false;
  runSketch: boolean = false;

  // Default settings if no updated settings
  settings: Settings = {
    fieldSize: 50,
    gameLevel: 1,
    gameOptions: 'Normal',
    playerOptions: 'Player',
  };

  constructor() {}
  ngOnInit(): void {}

  closeWindow = () => {
    console.log('clicked close window');
    window.close();
  };

  playGame = () => {
    console.log('play game fired');
    this.showPlayButton = false;
    this.showExitButton = true;
    this.runSketch = true;
    new P5((p5: P5) => new GameFactory(p5, this.runSketch).createSketch());
    // run the game
    // save it to the model
    // do a get requetst
    // results of the get request i save to the model
    // pass model values into the p5 game
  };
}

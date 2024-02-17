import { Score, Settings } from '../utils/interfaces';

export class Model {
  scores: Score[];
  settings: Settings;

  constructor(scores: Score[], settings: Settings) {
    this.scores = scores;
    this.settings = settings;
  }
}

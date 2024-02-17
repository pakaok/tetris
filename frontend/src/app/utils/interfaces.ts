export interface GameValues {
  width: number;
  height: number;
  x_top: number;
  y_bottom: number;
}

export interface Score {
  rank: number;
  name: string;
  score: number;
}

export interface Settings {
  fieldSize: number;
  gameLevel: number;
  gameOptions: 'Normal' | 'Extended';
  playerOptions: 'Player' | 'AI';
}

export interface SettingsData {
  fieldSize: number;
  gameLevel: number;
  gameOption: string;
  playerOption: string;
}

export interface PostPayload {
  ok: boolean;
  error: boolean;
}

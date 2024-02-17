import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';
import { SettingsData } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [],
})
export class SettingsComponent implements OnInit {
  // Initial values
  // the slider values
  fieldSize: number = 50;
  gameLevel: number = 1;

  // Radio values
  gameOptions: string[] = ['Normal', 'Extended'];
  playerOptions: string[] = ['Player', 'AI'];

  // selected values
  selectedGameOption: string = '';
  selectedPlayerOption: string = '';

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.modelService.getFromEndpoint('settings').subscribe((data) => {
      if (data.error) {
        alert('Check node js is running');
      } else {
        console.log('data is', data);
        // Set Values
        this.fieldSize = data.fieldSize;
        this.gameLevel = data.gameLevel;
        this.selectedGameOption = data.gameOption;
        this.selectedPlayerOption = data.playerOption;
      }
    });
  }

  submitSettings = () => {
    if (this.selectedGameOption === '' || this.selectedPlayerOption === '') {
      return alert('Ensure all options have been chosen.');
    } else {
      console.log('submit fired');
      console.log('selected game option is', this.selectedGameOption);
      console.log('selected player option is', this.selectedPlayerOption);

      const settingsBody: SettingsData = {
        fieldSize: this.fieldSize,
        gameLevel: this.gameLevel,
        gameOption: this.selectedGameOption,
        playerOption: this.selectedPlayerOption,
      };

      // post to server
      this.modelService.postSettings(settingsBody).subscribe((data) => {
        if (data.error) {
          alert('Check node js is running');
        } else {
          console.log('post returned', data);
          if (data.ok) {
            alert('Successfully updated settings');
          } else {
            alert('Server error occurred while updating settings.');
          }
        }
      });
    }
  };
}

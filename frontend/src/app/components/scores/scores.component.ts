import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';
import { Score } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styles: [],
})
export class ScoresComponent implements OnInit {
  // Initial Values
  scores: Score[] = [];

  linesCleared: number = 0;

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.modelService.getFromEndpoint('scores').subscribe((data) => {
      if (data.error) {
        alert('Check node js is running');
      } else {
        console.log('the data is', data);
        // Set Values
        this.scores.push(...data);
      }
    });
  }
}

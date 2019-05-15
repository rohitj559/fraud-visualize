import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
  errorMessage: string;
  doughnutType = 'doughnut';
  chartLabels: string[] = [];
  chartData = [120, 150, 180];
  activeCardChunks: number[] = [];
  private dnutSubscription: Subscription;

  constructor(private dnutDataService: DataService) { }

  ngOnInit() {
    this.dnutSubscription = this.dnutDataService.getData().subscribe(
      responseData => {
        const activeCards: number[] = [];
        responseData.forEach(row => {
          activeCards.push(row.Active_Cards);
        });

        this.activeCardChunks = this.chunks(activeCards, 6);

        this.chartData = [this.addChunk(this.activeCardChunks[2]),
          this.addChunk(this.activeCardChunks[1]),
          this.addChunk(this.activeCardChunks[0])];

        this.chartLabels = [`Before product Usage: ${this.chartData[0]}`,
          `6 months after usage: ${this.chartData[1]}`,
          `1 year after usage: ${this.chartData[2]}`];
      },
      error => this.errorMessage =  error as any
    );
  }

  chunks(myArray, chunkSize){
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = myArray.slice(index, index + chunkSize);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    return tempArray;
  }

  addChunk(chunkArray) {
    return chunkArray.reduce((sum, chunkSum) => {
      return sum + chunkSum; }, 0);
  }

  ngOnDestroy() {
    this.dnutSubscription.unsubscribe();
  }
}

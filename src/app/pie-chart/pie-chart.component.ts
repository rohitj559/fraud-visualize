import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  errorMessage: string;
  chartType = 'pie';
  chartLabels: string[] = [];
  chartData: number[] = [1, 2, 3];
  fraudLossChunks: number[] = [];

  constructor(private pieDataService: DataService) { }

  ngOnInit() {
    this.pieDataService.getData().subscribe(
      responseData => {
        const fraudLoss: number[] = [];
        responseData.forEach(row => {
          fraudLoss.push(row.Fraud_Loss);
        });

        this.fraudLossChunks = this.chunks(fraudLoss, 6);

        this.chartData = [this.addChunk(this.fraudLossChunks[2]),
          this.addChunk(this.fraudLossChunks[1]),
          this.addChunk(this.fraudLossChunks[0])];

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

}

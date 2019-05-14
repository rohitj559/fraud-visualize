import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  errorMessage: string;
  chartOptions = {
    // scaleShowVerticalLines: false,
    responsive: true
  };
  chartType = 'line';
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      responseData => {
        let months: string[] = [];
        let activeCards: number[] = [];
        let fraudLoss: number[] = [];
        let labels: string[] = [];
        responseData.forEach(row => {
          months.push(row.Month);
          activeCards.push(row.Active_Cards);
          fraudLoss.push(row.Fraud_Loss);
        });
        Object.keys(responseData[0]).forEach(key => {
          labels.push(key);
        });

        this.chartLabels = months;
        this.chartData  = [
          {data: activeCards, label: 'Active_Cards'},
          {data: fraudLoss, label: 'Fraud_Loss'}
        ];
      },
      error => this.errorMessage =  error as any
    );
  }
}

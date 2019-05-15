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
      console.log(responseData);
      const months = responseData.map(res => res.Month);
      const activeCards = responseData.map(res => res.Active_Cards);
      const fraudLoss = responseData.map(res => res.Fraud_Loss);

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

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IChartData } from '../shared/chart-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  errorMessage: string;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType = 'bar';
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: any[] = [];

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

        this.barChartLabels = months;
        this.barChartData  = [
          {data: activeCards, label: 'Active_Cards'},
          {data: fraudLoss, label: 'Fraud_Loss'}
        ];
      },
      error => this.errorMessage =  error as any
    );
  }
}

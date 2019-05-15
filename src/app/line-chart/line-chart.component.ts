import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {
  errorMessage: string;
  chartOptions = {
    responsive: true
  };
  chartType = 'line';
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: any[] = [];
  lineDataSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.lineDataSub = this.dataService.getData().subscribe(
      responseData => {
      // console.log(responseData);
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

  ngOnDestroy() {
    this.lineDataSub.unsubscribe();
  }
}

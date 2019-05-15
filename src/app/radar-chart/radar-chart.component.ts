import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit, OnDestroy {
  errorMessage: string;
  // barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  chartType = 'radar';
  chartLegend = true;
  chartLabels: string[] = [];
  chartData: any[] = [];
  private radarSubscribe: Subscription;

  constructor(private radarDataService: DataService) { }

  ngOnInit(): void {
    this.radarSubscribe = this.radarDataService.getData().subscribe(
      responseData => {
        const months: string[] = [];
        const activeCards: number[] = [];
        const fraudLoss: number[] = [];
        const labels: string[] = [];
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

  ngOnDestroy() {
    this.radarSubscribe.unsubscribe();
  }

}

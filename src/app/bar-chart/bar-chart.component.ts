import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { IChartData } from '../shared/chart-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {
  errorMessage: string;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    // scales: {
    //   xAxes: [{
    //     display: true,
    //     labelString: 'Months'
    //   }]
    // }
  };
  barChartType = 'bar';
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: any[] = [];
  private barSubscribe: Subscription;

  constructor(private barDataService: DataService) { }

  ngOnInit(): void {
    this.barSubscribe = this.barDataService.getData().subscribe(
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

        this.barChartLabels = months;
        this.barChartData  = [
          {data: activeCards, label: 'Active_Cards'},
          {data: fraudLoss, label: 'Fraud_Loss'}
        ];
      },
      error => this.errorMessage =  error as any
    );
  }

  ngOnDestroy() {
    this.barSubscribe.unsubscribe();
  }
}

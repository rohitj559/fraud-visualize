import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { PredictionComponent } from './prediction/prediction.component';
import { OtherChartsComponent } from './other-charts/other-charts.component';

const routes: Routes = [
  {path: 'visualization', component: BarChartComponent},
  {path: 'prediction', component: PredictionComponent},
  {path: 'bar-chart', component: BarChartComponent},
  {path: 'line-chart', component: LineChartComponent},
  {path: 'doughnut-chart', component: DoughnutChartComponent},
  {path: 'radar-chart', component: RadarChartComponent},
  {path: 'pie-chart', component: PieChartComponent},
  {path: 'other-charts', component: OtherChartsComponent},
  {path: '**', component: BarChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit, OnDestroy {
  errorMessage: string;
  predictedValue: number;
  predicted = false;
  private formSubscribe: Subscription;

  constructor(private formDataService: DataService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.formSubscribe.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    const month = (new Date(form.value.month).getTime() / 1000);
    this.formSubscribe = this.formDataService.getPrediction(month, form.value.activeCards).subscribe(
        responsePrediction => {
          // console.log(responsePrediction);
          this.predictedValue = responsePrediction;
          if (this.predictedValue) {
            this.predicted = true;
          }
      },
      error => this.errorMessage =  error as any
    );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { IData } from '../data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  rippleData: any[];
  errorMessage: string;
  private dataSubscribe: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataSubscribe = this.dataService.getData().subscribe(
      responseData => {
        this.rippleData = responseData.slice(0, 5);
        // console.log(this.rippleData);
      },
      error => this.errorMessage = error as any
    );
  }

  ngOnDestroy() {
    this.dataSubscribe.unsubscribe();
  }
}

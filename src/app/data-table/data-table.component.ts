import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IData } from '../data';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  rippleData: any[];
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      responseData => {
        this.rippleData = responseData.slice(0, 5);
        console.log(this.rippleData);
      },
      error => this.errorMessage = error as any
    );
  }
}

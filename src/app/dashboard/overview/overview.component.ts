import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  module: string;
  constructor() { 
    this.module ="Dashboard"
  }

  ngOnInit() {
  }

}

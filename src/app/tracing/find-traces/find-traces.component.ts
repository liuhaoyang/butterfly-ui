import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-traces',
  templateUrl: './find-traces.component.html',
  styleUrls: ['./find-traces.component.css']
})
export class FindTracesComponent implements OnInit {

  models : string[]

  constructor() {
    this.models=["9245fe4a-d402-451c-b9ed-9c1a04247482","9245fe4a-d402-451c-b9ed-9c1a04247482"];
   }

  ngOnInit() {
  }

}

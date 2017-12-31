import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.css']
})

export class SpanComponent implements OnInit {

  spanId: string;
  constructor() { }

  ngOnInit() {
    alert(this.spanId);
  }

  @Input()
  set SpanId(value: string) {
    this.spanId = value;
   
  }
}

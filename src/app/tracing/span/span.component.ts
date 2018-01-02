import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { TraceService } from '../../services/trace.service';
import { SpanDetailViewModel, LogFieldViewModel, LogViewModel } from '../../models/spandetail.viewModel';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.css']
})

export class SpanComponent implements OnInit {

  spanId: string;
  data: SpanDetailViewModel;
  logs: LogFieldViewModel[] = [];

  constructor(private traceService: TraceService, private subject: NzModalSubject) {
    this.data = new SpanDetailViewModel();
  }

  async ngOnInit() {
    this.data = await this.traceService.getSpanDetail(this.spanId);
    let logViewModels = [];
    for (let log of this.data.logs) {
      log.fields.forEach((field, index) => {
        let logViewModel = new LogFieldViewModel(log.timestamp, field.key, field.value);
        if (index == 0) {
          logViewModel.showTimestamp = true;
        }
        logViewModels.push(logViewModel);
      });
    }
    this.logs = logViewModels;
    console.log(this.logs);
  }

  @Input()
  set SpanId(value: string) {
    this.spanId = value;
  }
}
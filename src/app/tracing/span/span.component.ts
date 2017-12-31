import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { TraceService } from '../../services/trace.service';
import { SpanDetailViewModel, LogFieldViewModel, LogViewModel } from '../../models/spandetail.viewModel';
import { LinqService } from 'ng2-linq';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.css']
})

export class SpanComponent implements OnInit {

  spanId: string;
  data: SpanDetailViewModel;
  logs: LogFieldViewModel[] = [];

  constructor(private traceService: TraceService, private subject: NzModalSubject, private linq: LinqService) {
    this.data = new SpanDetailViewModel();
  }

  async ngOnInit() {
    this.data = await this.traceService.getSpanDetail(this.spanId);
    let spanLogs = this.linq.Enumerable().From(this.data.logs).OrderBy(x => x.timestamp).ToArray();
    let logViewModels = [];
    for (let log of spanLogs) {
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
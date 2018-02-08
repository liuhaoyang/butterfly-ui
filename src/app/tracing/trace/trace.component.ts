import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TraceService } from '../../services/trace.service';
import { TraceDetailViewModel, SpanViewModel } from '../../models/tracedetail.viewModel';
import 'rxjs/add/operator/switchMap';
import { utils } from "../../app.utils";
import { fadeAnimation } from 'ng-zorro-antd/src/core/animation/fade-animations';
import { NzModalService } from 'ng-zorro-antd';
import { SpanComponent } from '../span/span.component'

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  loading: boolean = false;
  detailViewModel: TraceDetailViewModel;
  timelines: string[] = [];

  constructor(private traceService: TraceService, private route: ActivatedRoute, private modalService: NzModalService) {
    this.detailViewModel = new TraceDetailViewModel();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.traceService.getTraceDetail(params.get('id')))
      .subscribe((result: TraceDetailViewModel) => {
        this.detailViewModel = result;
        this.bindTineLine(result.duration);
      });
  }

  bindTineLine(duration: number) {
    for (let i = 2; i <= 8; i++) {
      this.timelines.push(utils.toDisplayDuration(duration * i / 8));
    }
  }

  collapse(span: SpanViewModel, expand: boolean) {
    if (expand) {
      return;
    }
    if (span.hasChildren) {
      for (let child of span.children) {
        child.expand = expand;
        this.collapse(child, expand);
      }
    }
  }

  showSpanDetail(span: SpanViewModel) {
    const subscription = this.modalService.open({
      title: span.operationName,
      content: SpanComponent,
      //width: document.body.clientWidth * 0.5,
      width: 540,
      footer: false,
      componentParams: {
        SpanId: span.spanId
      }
    });
  }
} 
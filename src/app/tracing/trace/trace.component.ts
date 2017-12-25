import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TraceService } from '../../services/trace.service';
import { TraceDetailViewModel, TraceTimelineViewModel } from '../../models/tracedetail.viewModel';
import 'rxjs/add/operator/switchMap';
import { utils } from "../../app.utils";

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  loading: boolean = false;
  detailViewModel: TraceDetailViewModel;
  timeline: TraceTimelineViewModel;

  constructor(private traceService: TraceService, private route: ActivatedRoute) {
    this.detailViewModel = new TraceDetailViewModel();
    this.timeline = new TraceTimelineViewModel();
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
    this.timeline.Q1 = utils.toDisplayDuration(duration / 8);
    this.timeline.Q2 = utils.toDisplayDuration(duration * 2 / 8);
    this.timeline.Q3 = utils.toDisplayDuration(duration * 3 / 8);
    this.timeline.Q4 = utils.toDisplayDuration(duration * 4 / 8);
    this.timeline.Q5 = utils.toDisplayDuration(duration * 5 / 8);
    this.timeline.Q6 = utils.toDisplayDuration(duration * 6 / 8);
    this.timeline.Q7 = utils.toDisplayDuration(duration * 7 / 8);
    this.timeline.Q8 = utils.toDisplayDuration(duration);
  }
}
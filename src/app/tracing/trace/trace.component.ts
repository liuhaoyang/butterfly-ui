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

  data = [
    {
      key     : 1,
      name    : 'John Brown sr.',
      age     : 60,
      address : 'New York No. 1 Lake Park',
      children: [ {
        key    : 11,
        name   : 'John Brown',
        age    : 42,
        address: 'New York No. 2 Lake Park',
      }, {
        key     : 12,
        name    : 'John Brown jr.',
        age     : 30,
        address : 'New York No. 3 Lake Park',
        children: [ {
          key    : 121,
          name   : 'Jimmy Brown',
          age    : 16,
          address: 'New York No. 3 Lake Park',
        } ],
      }, {
        key     : 13,
        name    : 'Jim Green sr.',
        age     : 72,
        address : 'London No. 1 Lake Park',
        children: [ {
          key     : 131,
          name    : 'Jim Green',
          age     : 42,
          address : 'London No. 2 Lake Park',
          children: [ {
            key    : 1311,
            name   : 'Jim Green jr.',
            age    : 25,
            address: 'London No. 3 Lake Park',
          }, {
            key    : 1312,
            name   : 'Jimmy Green sr.',
            age    : 18,
            address: 'London No. 4 Lake Park',
          } ],
        } ],
      } ],
    },
    {
      key    : 2,
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];
}
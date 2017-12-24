import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TraceService } from '../../services/trace.service';
import { TraceDetailViewModel } from '../../models/tracedetail.viewModel';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  loading: boolean = false;
  detailViewModel: TraceDetailViewModel;

  constructor(private traceService: TraceService, private route: ActivatedRoute) {
    this.detailViewModel = new TraceDetailViewModel();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.traceService.getTraceDetail(params.get('id')))
      .subscribe((result: TraceDetailViewModel) => this.detailViewModel = result);
  }
}
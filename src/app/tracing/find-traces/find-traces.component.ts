import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { TraceViewModel, SearchTraceViewModel } from '../../models/trace.viewModel'
import { PageViewModel } from '../../models/page.viewModel';

@Component({
  selector: 'app-find-traces',
  templateUrl: './find-traces.component.html',
  styleUrls: ['./find-traces.component.css']
})

export class FindTracesComponent implements OnInit {

  loading: boolean;
  selectorOpen: boolean = false;
  traceViewModel: PageViewModel<TraceViewModel>;
  searchViewModel: SearchTraceViewModel;
  services: string[] = [];
  _value:string;

  constructor(private traceService: TraceService) {
    this.loading = true;
    this.traceViewModel = new PageViewModel<TraceViewModel>();
    this.searchViewModel = new SearchTraceViewModel();
  }

  ngOnInit() {
    this.refreshData();
  }

  async refreshData() {
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel, this.traceViewModel.pageNumber, this.traceViewModel.pageSize);
    this.loading = false;
  }

  async serviceSelectorOpen() {
    if (!this.selectorOpen) {
      this.services = await this.traceService.getServices();
      this.selectorOpen = true;
    }
    else {
      this.selectorOpen = false;
    }
  }
}
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
  selectorOpen = false;
  traceViewModel: TraceViewModel[] = [];
  searchViewModel: SearchTraceViewModel;
  services: string[] = [];
  limits: number[] = [10, 20, 50, 100];


  constructor(private traceService: TraceService) {
    this.searchViewModel = new SearchTraceViewModel();
  }

  ngOnInit() {
    this.refreshData();
  }

  async refreshData() {
    this.loading = true;
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel);
    this.services = await this.traceService.getServices();
    console.log(this.traceViewModel);
    this.loading = false;
  }

  async serviceSelectorOpen() {
    if (!this.selectorOpen) {
      this.selectorOpen = true;
    }else {
      this.selectorOpen = false;
    }
  }
}

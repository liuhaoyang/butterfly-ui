import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { TraceViewModel, SearchTraceViewModel } from '../../models/trace.viewModel';
import { PageViewModel } from '../../models/page.viewModel';

@Component({
  selector: 'app-find-traces',
  templateUrl: './traces.component.html',
  styleUrls: ['./traces.component.css']
})

export class TracesComponent implements OnInit {

  loading: boolean;
  selectorOpen = false;
  traceViewModel: TraceViewModel[] = [];
  searchViewModel: SearchTraceViewModel;
  services: string[] = [];
  limits: number[] = [10, 20, 50];

  constructor(private traceService: TraceService) {
    this.searchViewModel = new SearchTraceViewModel();
  }

  async ngOnInit() {
    this.refreshData();
  }

  async refreshData() {
    this.loading = true;
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel);
    this.loading = false;
  }

  async serviceSelectorOpen() {
    if (!this.selectorOpen) {
      this.selectorOpen = true;
      this.services = await this.traceService.getServices();
    } else {
      this.selectorOpen = false;
    }
  }
}

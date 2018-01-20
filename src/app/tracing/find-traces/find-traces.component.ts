import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { TraceViewModel, SearchTraceViewModel } from '../../models/trace.viewModel';
import { PageViewModel } from '../../models/page.viewModel';

@Component({
  selector: 'app-find-traces',
  templateUrl: './find-traces.component.html',
  styleUrls: ['./find-traces.component.css']
})

export class FindTracesComponent implements OnInit {

  loading: boolean;
  traceViewModel: TraceViewModel[] = [];
  searchViewModel: SearchTraceViewModel;
  services: string[] = [];
  limits: number[] = [10, 20, 50, 100];

  constructor(private traceService: TraceService) {
    this.searchViewModel = new SearchTraceViewModel();
  }

  async ngOnInit() {
    this.refreshData();
    this.services = await this.traceService.getServices();
  }

  async refreshData() {
    this.loading = true;
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel);
    this.loading = false;
  }
}

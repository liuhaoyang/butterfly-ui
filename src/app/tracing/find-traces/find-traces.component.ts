import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { TraceViewModel } from '../../models/trace.viewModel'
import { PageViewModel } from '../../models/page.viewModel';

@Component({
  selector: 'app-find-traces',
  templateUrl: './find-traces.component.html',
  styleUrls: ['./find-traces.component.css']
})

export class FindTracesComponent implements OnInit {

  loading: boolean;
  model: PageViewModel<TraceViewModel>;

  constructor(private traceService: TraceService) {
    //this.models = ["9245fe4a-d402-451c-b9ed-9c1a04247482", "9245fe4a-d402-451c-b9ed-9c1a04247482"];
    this.loading = true;
    this.model = new PageViewModel<TraceViewModel>();
    this.model.pageSize=1;
  }

  ngOnInit() {
    this.refreshData();
  }

  async refreshData() {
    this.model = await this.traceService.getTraces(this.model.pageNumber,this.model.pageSize);
    this.loading = false;
    console.log(this.model);
  }
}

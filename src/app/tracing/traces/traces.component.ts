import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { TraceViewModel, SearchTraceViewModel, TraceHistogramViewModel } from '../../models/trace.viewModel';
import { PageViewModel } from '../../models/page.viewModel';
import G2 from '@antv/g2';

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
  chart: any;
  data: TraceHistogramViewModel[] = [];

  constructor(private traceService: TraceService) {
    this.searchViewModel = new SearchTraceViewModel();
  }

  async ngOnInit() {
    this.refreshData();
    this.chart = new G2.Chart({
      container: 'chart', // 指定图表容器 ID
      forceFit: true,
      height: 300
    });
    this.chart.source(this.data);
    this.chart.scale({
      time: {
        type: 'time',
        tickCount: 10,
        mask: 'YYYY-MM-DD HH:mm'
      },
      count: {
      }});
      this.chart.axis('count', {
        label: {
          autoRotate: true,
          formatter: val => {
            if (val < 1000) {
              return val;
            }
            return (val / 1000).toFixed(1) + 'k';
          }
        },
        line: {
          lineWidth: 1,
          stroke: '#c5c2c2',
        }
      });
      this.chart.area().position('time*count');
      this.chart.line().position('time*count').size(1);
    this.chart.render();
  }

  async refreshData() {
    this.loading = true;
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel);
    this.data = await this.traceService.getTraceHistogram(this.searchViewModel);
    this.chart.changeData(this.data);
    console.log(this.data);
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

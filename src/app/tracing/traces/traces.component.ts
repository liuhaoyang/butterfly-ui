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
    this.chart = this.initCharts();
    this.refreshData();
  }

  async refreshData() {
    this.loading = true;
    this.traceViewModel = await this.traceService.getTraces(this.searchViewModel);
    this.data = await this.traceService.getTraceHistogram(this.searchViewModel);
    if (this.data.length === 0) {
      this.chart.changeVisible(false);
    } else {
      this.chart.changeVisible(true);
      this.chart.changeData(this.data);
    }

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

  initCharts(): any {
    const chart = new G2.Chart({
      container: 'chart',
      forceFit: true,
      height: 300
    });
    chart.scale({
      time: {
        type: 'time',
        mask: 'YYYY-MM-DD HH:mm'
      },
      count: {
      }
    });
    chart.axis('time', {
      grid: {
        type: 'time',
        lineStyle: {
          stroke: '#d9d9d9',
          lineWidth: 1,
          lineDash: [4, 4]
        }
      }
    });
    chart.axis('count', {
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
    chart.area().position('time*count');
    chart.line().position('time*count').size(0.5);
    chart.render();
    chart.changeVisible(false);
    return chart;
  }
}

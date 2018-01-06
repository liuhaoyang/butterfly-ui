import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TraceService } from '../../services/trace.service';
import { TimestampSearchViewModel } from '../../models/search.viewModel';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

@Component({
    selector: 'app-dependency',
    templateUrl: './dependency.component.html',
    styleUrls: ['./dependency.component.css']
})
export class DependencyComponent implements OnInit, AfterViewInit {

    searchViewModel: TimestampSearchViewModel;
    alertDisplay: string;
    chartDisplay: string;
    chartHeight: string;
    chart: echarts.ECharts;

    constructor(private traceService: TraceService, private message: NzMessageService) {
        this.searchViewModel = new TimestampSearchViewModel();
    }

    ngOnInit() {
        let height = document.body.clientHeight * 0.70;
        this.chartHeight = height + 'px';
    }

    ngAfterViewInit() {
        let divElement = <HTMLDivElement>document.getElementById('chart');
        this.chart = echarts.init(divElement);
        this.refreshData();
    }

    async refreshData() {


        this.chart.clear();
        let data = await this.traceService.getDependencies(this.searchViewModel);
        if (data.nodes.length <= 0) {
            this.alertDisplay = "block";
            this.chartDisplay = "none";
        }
        else {
            this.chartDisplay = "block";
            this.alertDisplay = "none";
            this.chart.setOption(this.initChartOptions(data.nodes, data.edges));
        }
    }

    //todo use viewModel
    initChartOptions(nodes: Array<any>, edges: Array<any>): EChartOption {
        var option = {
            tooltip: {},
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut',
            color: ['#479ed4'],
            backgroundColor: 'rgba(0,0,0,.05)',
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 1000,
                        edgeLength: [360, 270]
                    },
                    symbolSize: 60,
                    roam: true,
                    focusNodeAdjacency: true,
                    draggable: true,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 13
                            }
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 13
                            },
                            formatter: '{c}'
                        }
                    },
                    nodes: nodes,
                    edges: edges,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        };
        return option;
    }
}
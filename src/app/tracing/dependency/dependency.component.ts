import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';

@Component({
    selector: 'app-dependency',
    templateUrl: './dependency.component.html',
    styleUrls: ['./dependency.component.css']
})
export class DependencyComponent implements OnInit {

    constructor(private traceService: TraceService) {
    }

    async ngOnInit() {

        let divElement = <HTMLDivElement>document.getElementById('main');

        var chart = echarts.init(divElement);

        let data = await this.traceService.getDependencies();

        chart.setOption(this.initChartOptions(data.nodes, data.edges));
    }

    //todo use viewModel
    initChartOptions(nodes: Array<any>, edges: Array<any>): EChartOption {
        var option = {
            tooltip: {},
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut',
            color: ['#479ed4'],
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 1000,
                        edgeLength: [50, 300]
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
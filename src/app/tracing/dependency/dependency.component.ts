import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TraceService } from '../../services/trace.service';
import { TimestampSearchViewModel } from '../../models/search.viewModel';
import * as vis from 'vis';

@Component({
    selector: 'app-dependency',
    templateUrl: './dependency.component.html',
    styleUrls: ['./dependency.component.css']
})
export class DependencyComponent implements OnInit, AfterViewInit {

    searchViewModel: TimestampSearchViewModel;
    chartHeight: string;
    nodeSet: vis.DataSet;
    edgeSet: vis.DataSet;
    loading: boolean;

    constructor(private traceService: TraceService, private message: NzMessageService) {
        this.searchViewModel = new TimestampSearchViewModel();
        this.chartHeight = 0 + 'px';
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const height = document.body.clientHeight * 0.7;
        this.chartHeight = height + 'px';
        const divElement = <HTMLDivElement>document.getElementById('chart');
        divElement.style.height = this.chartHeight;
        this.nodeSet = new vis.DataSet();
        this.edgeSet = new vis.DataSet();
        const data = { nodes: this.nodeSet, edges: this.edgeSet };
        const network = new vis.Network(divElement, data, this.initOptions());
        this.refreshData();
    }

    async refreshData() {
        this.loading = true;
        const data = await this.traceService.getDependencies(this.searchViewModel);
        this.bindNode(data.nodes);
        this.bindEdges(data.edges);
        this.loading = false;
    }

    bindNode(nodeData: Array<any>) {
        const nodeSet = this.nodeSet;
        const nodes = new Array();
        nodeData.forEach(item => {
            nodes.push({ id: item.name, label: item.name, title: item.name + ' ' + item.value });
        });
        nodeSet.clear();
        nodeSet.add(nodes);
    }

    bindEdges(edgeData: Array<any>) {
        const edgeSet = this.edgeSet;
        const edges = new Array();
        edgeData.forEach(item => {
            edges.push({ from: item.source, to: item.target, title: item.source + '->' + item.target + ' ' + item.value });
        });
        edgeSet.clear();
        edgeSet.add(edges);
    }

    initOptions() {
        const options = {
            nodes: {
                shape: 'dot',
                size: 18,
                font: {
                    size: 13
                },
                shadow: true,
                color: {
                    background: '#97C2FC'
                }
            },
            edges: {
                width: 1,
                shadow: true,
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                }
            },
            layout: {
                randomSeed: 1,
                hierarchical: {
                    direction: 'LR',
                    levelSeparation: 160,
                    sortMethod: 'directed'
                }
            },
            interaction: {
                hover: true
            }
        };
        return options;
    }
}

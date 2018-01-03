import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UrlUtils } from './url.utils';
import { PageViewModel } from '../models/page.viewModel';
import { TraceViewModel, TraceServiceViewModel, DisplayServiceViewModel, SearchTraceViewModel } from '../models/trace.viewModel';
import { forEach } from '@angular/router/src/utils/collection';
import { TraceDetailViewModel, SpanViewModel } from '../models/tracedetail.viewModel';
import { SpanDetailViewModel } from '../models/spandetail.viewModel';
import { TimestampSearchViewModel } from '../models/search.viewModel';
import { utils } from "../app.utils";

@Injectable()
export class TraceService {

    constructor(private http: HttpClient, private url: UrlUtils) {
    }

    async getTraces(search: SearchTraceViewModel, pageNumber: number = 1, pageSize: number = 10): Promise<PageViewModel<TraceViewModel>> {

        var httpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", pageSize.toString());

        if (search.service != null) {
            httpParams = httpParams.set("service", search.service);
        }

        if (search.tags != null) {
            httpParams = httpParams.set("tags", search.tags);
        }

        if (search.startTimestamp != null) {
            httpParams = httpParams.set("startTimestamp", search.startTimestamp.toLocaleString());
        }

        if (search.finishTimestamp != null) {
            httpParams = httpParams.set("finishTimestamp", search.finishTimestamp.toLocaleString());
        }

        let result = await this.http.get<PageViewModel<TraceViewModel>>(this.url.getTrace, { params: httpParams }).toPromise();

        if (result.data.length == 0) {
            return result;
        }

        let maxDuration = this.max(result.data, x => x.duration);

        for (let item of result.data) {   
            let traceServiceMap = new Map<string, TraceServiceViewModel[]>();
            for (let service of item.services) {
                if (traceServiceMap.has(service.name)) {
                    traceServiceMap.get(service.name).push(service);
                }
                else {
                    traceServiceMap.set(service.name, [service]);
                }
            }
            let displayServices = [];
            //todo
            traceServiceMap.forEach((v, k) => {
                displayServices.push(new DisplayServiceViewModel(k, v.length));
            });
            item.displayServices = displayServices;
            item.displayDuration = utils.toDisplayDuration(item.duration);
            item.durationWidth = item.duration / maxDuration * 100;
            if (item.durationWidth < 8) {
                item.durationWidth = 8;
            }
        }

        return result;
    }

    async getServices(): Promise<string[]> {
        return await this.http.get<string[]>(this.url.getService).toPromise();
    }

    async getTraceDetail(traceId: string): Promise<TraceDetailViewModel> {
        let trace = await this.http.get<TraceDetailViewModel>(this.url.getTraceDetail + traceId).toPromise();
        trace.displayDuration = utils.toDisplayDuration(trace.duration);
        let spans = this.expandTree(trace.spans, null, 0);
        let services = new Map<string, string>();
        let traceDuration = trace.duration;
        let start = trace.startTimestamp;
        for (let span of spans) {
            span.displayDuration = utils.toDisplayDuration(span.duration);
            span.displayWidth = span.duration / traceDuration * 100;
            span.displayOffset = span.offset / traceDuration * 100;
            if (!services.has(span.serviceName)) {
                services.set(span.serviceName, span.serviceName);
            }
        }
        trace.services = services.size;
        trace.spans = spans;
        return trace;
    }

    private expandTree(childern: SpanViewModel[], parent: SpanViewModel, level: number): SpanViewModel[] {
        let spans = [];
        for (let span of childern) {
            span.level = level;
            span.parent = parent;
            span.hasChildren = span.children && span.children.length > 0;
            spans.push(span);
            if (span.hasChildren) {
                let childs = this.expandTree(span.children, span, level + 1);
                for (let child of childs) {
                    spans.push(child);
                }
            }
        }
        return spans;
    }

    async getSpanDetail(spanId: string): Promise<SpanDetailViewModel> {
        var span = await this.http.get<SpanDetailViewModel>(this.url.getSpanDetail + spanId).toPromise();
        span.displayDuration = utils.toDisplayDuration(span.duration);
        return span;
    }

    //todo use viewModel
    //todo symbolSize
    async getDependencies(search: TimestampSearchViewModel): Promise<any> {
        
        var httpParams = new HttpParams();

        if (search.startTimestamp != null) {
            httpParams = httpParams.set("startTimestamp", search.startTimestamp.toLocaleString());
        }

        if (search.finishTimestamp != null) {
            httpParams = httpParams.set("finishTimestamp", search.finishTimestamp.toLocaleString());
        }

        return this.http.get(this.url.getDependencies, { params: httpParams }).toPromise();
    }

    private max<T>(data: T[], predicate: (x: T) => number): number {
        let max = 0;
        for (let item of data) {
            let itemValue = predicate(item);
            if (itemValue > max) {
                max = itemValue;
            }
        }
        return max;
    }
}
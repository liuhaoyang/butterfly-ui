import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlUtils } from './url.utils';
import { PageViewModel } from '../models/page.viewModel';
import { TraceViewModel, TraceServiceViewModel, DisplayServiceViewModel, SearchTraceViewModel } from '../models/trace.viewModel';
import { TraceHistogramViewModel } from '../models/trace.viewModel';
import { forEach } from '@angular/router/src/utils/collection';
import { TraceDetailViewModel, SpanViewModel } from '../models/tracedetail.viewModel';
import { SpanDetailViewModel } from '../models/spandetail.viewModel';
import { TimestampSearchViewModel } from '../models/search.viewModel';
import { utils } from '../app.utils';

@Injectable()
export class TraceService {

    constructor(private http: HttpClient, private url: UrlUtils) {
    }

    async getTraces(search: SearchTraceViewModel): Promise<TraceViewModel[]> {

        let httpParams = new HttpParams()
            .set('limit', search.limit.toString());

        if (search.service != null) {
            httpParams = httpParams.set('service', search.service);
        }

        if (search.tags != null) {
            httpParams = httpParams.set('tags', search.tags);
        }

        if (search.startTimestamp != null) {
            httpParams = httpParams.set('startTimestamp', search.startTimestamp.valueOf().toString());
        }

        if (search.finishTimestamp != null) {
            httpParams = httpParams.set('finishTimestamp', search.finishTimestamp.valueOf().toString());
        }

        const result = await this.http.get<TraceViewModel[]>(this.url.getTrace, { params: httpParams }).toPromise();

        if (result.length === 0) {
            return result;
        }

        const maxDuration = this.max(result, x => x.duration);

        for (const item of result) {
            const traceServiceMap = new Map<string, TraceServiceViewModel[]>();
            for (const service of item.services) {
                if (traceServiceMap.has(service.name)) {
                    traceServiceMap.get(service.name).push(service);
                }
                else {
                    traceServiceMap.set(service.name, [service]);
                }
            }
            const displayServices = [];
            // todo
            traceServiceMap.forEach((v, k) => {
                displayServices.push(new DisplayServiceViewModel(k, v.length));
            });
            item.displayServices = displayServices;
            item.displayDuration = utils.toDisplayDuration(item.duration);
            item.durationWidth = item.duration / maxDuration * 100;
            if (item.durationWidth < 4) {
                item.durationWidth = 4;
            }
        }

        return result;
    }

    async getServices(): Promise<string[]> {
        return await this.http.get<string[]>(this.url.getService).toPromise();
    }

    async getTraceDetail(traceId: string): Promise<TraceDetailViewModel> {
        const trace = await this.http.get<TraceDetailViewModel>(this.url.getTraceDetail + traceId).toPromise();
        trace.displayDuration = utils.toDisplayDuration(trace.duration);
        const spans = this.expandTree(trace.spans, null, 0);
        const services = new Map<string, string>();
        const traceDuration = trace.duration;
        const start = trace.startTimestamp;
        for (const span of spans) {
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

    // todo use viewModel
    // todo symbolSize
    async getDependencies(search: TimestampSearchViewModel): Promise<any> {
        let httpParams = new HttpParams();

        if (search.startTimestamp != null) {
            httpParams = httpParams.set('startTimestamp', search.startTimestamp.valueOf().toString());
        }

        if (search.finishTimestamp != null) {
            httpParams = httpParams.set('finishTimestamp', search.finishTimestamp.valueOf().toString());
        }

        return this.http.get(this.url.getDependencies, { params: httpParams }).toPromise();
    }

    async getTraceHistogram(search: SearchTraceViewModel): Promise<TraceHistogramViewModel[]> {

        let httpParams = new HttpParams()
            .set('limit', search.limit.toString());

        if (search.service != null) {
            httpParams = httpParams.set('service', search.service);
        }

        if (search.tags != null) {
            httpParams = httpParams.set('tags', search.tags);
        }

        if (search.startTimestamp != null) {
            httpParams = httpParams.set('startTimestamp', search.startTimestamp.valueOf().toString());
        }

        if (search.finishTimestamp != null) {
            httpParams = httpParams.set('finishTimestamp', search.finishTimestamp.valueOf().toString());
        }

        const result = await this.http.get<TraceHistogramViewModel[]>(this.url.getTraceHistogram, { params: httpParams }).toPromise();
        return result;
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

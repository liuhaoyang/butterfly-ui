import 'rxjs/add/operator/filter';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UrlUtils } from './url.utils';
import { PageViewModel } from '../models/page.viewModel';
import { TraceViewModel, DisplayServiceViewModel, SearchTraceViewModel } from '../models/trace.viewModel';
import { LinqService } from 'ng2-linq';
import { forEach } from '@angular/router/src/utils/collection';
import { TraceDetailViewModel } from '../models/tracedetail.viewModel';

@Injectable()
export class TraceService {

    constructor(private http: HttpClient, private url: UrlUtils, private linq: LinqService) {
    }

    async getTraces(search: SearchTraceViewModel, pageNumber: number = 1, pageSize: number = 10): Promise<PageViewModel<TraceViewModel>> {

        var httpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", pageSize.toString());

        if (search.service != null) {
            httpParams = httpParams.set("service", search.service);
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

        let maxDuration = this.linq.Enumerable().From(result.data).Max(x => x.duration);

        result.data.forEach((item, index) => {
            let displayServices = this.linq.Enumerable().From(item.services).GroupBy(x => x.name).Select(x => new DisplayServiceViewModel(x.Key(), x.Count())).ToArray();
            item.displayServices = displayServices;
            item.displayDuration = item.duration < 1000 ? item.duration + "μs" : item.duration / 1000.0 + "ms";
            item.durationWidth = item.duration / maxDuration * 100;
            if (item.durationWidth < 8) {
                item.durationWidth = 8;
            }
        });

        return result;
    }

    async getServices(): Promise<string[]> {
        return await this.http.get<string[]>(this.url.getService).toPromise();
    }

    async getTraceDetail(traceId: string): Promise<TraceDetailViewModel> {
        var trace = await this.http.get<TraceDetailViewModel>(this.url.getTraceDetail + traceId).toPromise();
        trace.displayDuration = trace.duration < 1000 ? trace.duration + "μs" : trace.duration / 1000.0 + "ms";
        return trace;
    }
}
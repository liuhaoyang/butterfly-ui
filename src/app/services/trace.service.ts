import 'rxjs/add/operator/filter';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UrlUtils } from './url.utils';
import { PageViewModel } from '../models/page.viewModel';
import { TraceViewModel, DisplayServiceViewModel } from '../models/trace.viewModel';
import { LinqService } from 'ng2-linq';
import { forEach } from '@angular/router/src/utils/collection';
import 'rxjs/add/operator/filter';


@Injectable()
export class TraceService {

    constructor(private http: HttpClient, private url: UrlUtils, private linq: LinqService) {
    }

    async getTraces(pageNumber: number = 1, pageSize: number = 10): Promise<PageViewModel<TraceViewModel>> {

        var httpParams = new HttpParams().set("pageNumber", pageNumber.toString()).set("pageSize", pageSize.toString());

        console.log(httpParams);

        let result = await this.http.get<PageViewModel<TraceViewModel>>(this.url.getTrace, { params: httpParams}).toPromise();

        let maxDuration = this.linq.Enumerable().From(result.data).Max(x => x.duration);

        result.data.forEach((item, index) => {
            let displayServices = this.linq.Enumerable().From(item.services).GroupBy(x => x.name).Select(x => new DisplayServiceViewModel(x.Key(), x.Count())).ToArray();
            item.displayServices = displayServices;
            item.displayDuration = item.duration < 1000 ? item.duration + "μs" : item.duration / 1000.0 + "ms";
            item.durationWidth = item.duration / maxDuration * 100;
            if (item.durationWidth < 6) {
                item.durationWidth = 6;
            }
        });

        return result;
    }
}
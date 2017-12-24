import { environment } from "../../environments/environment"
import { Injectable } from "@angular/core";

@Injectable()
export class UrlUtils {

    getTrace: string;
    getService: string;
    getTraceDetail: string;

    constructor() {
        this.getTrace = environment.collectorapi + "trace";
        this.getService = environment.collectorapi + "service";
        this.getTraceDetail = environment.collectorapi + "tracedetail/";
    }

}
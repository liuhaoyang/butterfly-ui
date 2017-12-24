import { environment } from "../../environments/environment"
import { Injectable } from "@angular/core";

@Injectable()
export class UrlUtils {

    getTrace: string;
    getService: string;

    constructor() {
        this.getTrace = environment.collectorapi + "trace";
        this.getService = environment.collectorapi + "service";
    }

}
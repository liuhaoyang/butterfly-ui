import { environment } from "../../environments/environment"
import { Injectable } from "@angular/core";

@Injectable()
export class UrlUtils {

    getTrace: string;

    constructor() {
        this.getTrace = environment.collectorapi + "trace";
    }

}
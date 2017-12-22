import 'rxjs/add/operator/filter';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"
import { Injectable } from '@angular/core';

@Injectable()
export class TraceService {

    constructor(private http: HttpClient){
    }

}
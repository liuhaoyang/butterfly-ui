import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { TraceService } from './services/trace.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isCollapsed = false;
    navs: string[]


    constructor(private router: Router, private http: HttpClient,private trace : TraceService) {

    }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.navs = event.urlAfterRedirects.split('/').filter(x => x != "");
                this.subNavsQueryString(this.navs);
            });
        // this.http.get(environment.collectorUrl + "/api/span").subscribe(data => {
        //     console.log(data);
        // });
    }

    subNavsQueryString(navs: string[]): void {
        for (let i = 0; i < navs.length; i++) {
            let item = navs[i];
            let indexOf = item.indexOf("?");
            if (indexOf != -1) {
                navs[i] = item.substring(0, indexOf);
            }
        }
    }
}

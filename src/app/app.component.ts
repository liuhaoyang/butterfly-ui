import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import * as G2 from '@antv/g2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    isCollapsed = false;
    breadcrumbs;

    constructor(private router: Router) {
        G2.track(false);
    }

    ngOnInit() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = event.urlAfterRedirects.split('/').filter(x => x != "");
                this.subNavsQueryString(this.breadcrumbs);
            }
        });
    }

    subNavsQueryString(breadcrumbs: string[]): void {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const item = breadcrumbs[i];
            const indexOf = item.indexOf('?');
            if (indexOf !== -1) {
                breadcrumbs[i] = item.substring(0, indexOf);
            }
        }
    }
}

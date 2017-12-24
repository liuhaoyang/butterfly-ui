import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    isCollapsed = false;
    breadcrumbs;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.breadcrumbs = event.urlAfterRedirects.split('/').filter(x => x != "");
                this.subNavsQueryString(this.breadcrumbs);
            });
    }

    subNavsQueryString(breadcrumbs: string[]): void {
        for (let i = 0; i < breadcrumbs.length; i++) {
            let item = breadcrumbs[i];
            let indexOf = item.indexOf("?");
            if (indexOf != -1) {
                breadcrumbs[i] = item.substring(0, indexOf);
            }
        }
    }
}

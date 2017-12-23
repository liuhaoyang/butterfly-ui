import { Component, OnInit } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    isCollapsed = false;
    navs: string[]

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.navs = event.urlAfterRedirects.split('/').filter(x => x != "");
                this.subNavsQueryString(this.navs);
            });
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

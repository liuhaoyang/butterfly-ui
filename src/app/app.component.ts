import { Component } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    isCollapsed = false;
    navs: string[]


    constructor(private router: Router) {
        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: any) => {
                console.log('NavigationEnd:', event);
                this.navs = event.urlAfterRedirects.split('/').filter(x => x != "");
                console.log(this.navs);
            });
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ApplicationComponent } from './application/application.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    declarations: [
        ApplicationComponent,
        OverviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule,
        DashboardRoutingModule
    ]
})

export class DashboardModule {
}

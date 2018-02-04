import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_LOCALE, enUS } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { TracingModule } from './tracing/tracing.module';
import { TraceService } from './services/trace.service';
import { UrlUtils } from './services/url.utils';
import { SpanComponent } from './tracing/span/span.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule.forRoot(),
        RouterModule,
        AppRoutingModule,
        DashboardModule,
        TracingModule
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: NZ_LOCALE, useValue: enUS },
        TraceService,
        UrlUtils
    ],
    entryComponents: [
        SpanComponent
    ]
})

export class AppModule {
}

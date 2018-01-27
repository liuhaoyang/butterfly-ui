import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { TracingRoutingModule } from './tracing-routing.module';
import { TracesComponent } from './traces/traces.component';
import { TraceComponent } from './trace/trace.component';
import { SpanComponent } from './span/span.component';
import { DependencyComponent } from './dependency/dependency.component';

@NgModule({
    declarations: [
        TracesComponent,
        TraceComponent,
        SpanComponent,
        DependencyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule,
        TracingRoutingModule
    ]
})

export class TracingModule {
}

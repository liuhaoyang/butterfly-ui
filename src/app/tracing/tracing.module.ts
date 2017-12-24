import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { TracingRoutingModule } from './tracing-routing.module';
import { FindTracesComponent } from './find-traces/find-traces.component';
import { TraceComponent } from './trace/trace.component';

@NgModule({
    declarations: [
        FindTracesComponent,
        TraceComponent
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

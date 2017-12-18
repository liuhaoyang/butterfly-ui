import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppComponent} from './app.component';
import { IndexComponent } from './index/index.component';
import { RouterModule }   from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TraceComponent } from './trace/trace.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        TraceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

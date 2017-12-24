import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { FindTracesComponent } from './find-traces/find-traces.component';
import { TraceComponent } from './trace/trace.component';

const routes: Routes = [
  {
    path: 'tracing',
    children: [
      { path: 'find-traces', component: FindTracesComponent },
      { path: 'trace/:id', component: TraceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracingRoutingModule { }
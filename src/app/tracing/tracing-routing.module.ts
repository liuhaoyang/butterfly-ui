import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { TracesComponent } from './traces/traces.component';
import { TraceComponent } from './trace/trace.component';
import { DependencyComponent } from './dependency/dependency.component';

const routes: Routes = [
  {
    path: 'tracing',
    children: [
      { path: 'traces', component: TracesComponent },
      { path: 'trace/:id', component: TraceComponent },
      { path: 'dependencies', component: DependencyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracingRoutingModule { }
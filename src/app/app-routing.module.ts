import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { TracingModule } from './tracing/tracing.module';

const routes: Routes = [
  { path: '',   redirectTo: '/tracing/traces', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'tracing', loadChildren: 'app/tracing/tracing.module#TracingModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule,
    TracingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
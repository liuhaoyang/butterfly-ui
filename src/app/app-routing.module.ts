import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard/overview', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
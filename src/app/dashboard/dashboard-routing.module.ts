import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { OverviewComponent } from './overview/overview.component';
import { componentFactoryName } from '@angular/compiler';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'application', component: ApplicationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
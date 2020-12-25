import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardViewerComponent } from './containers/dashboard-viewer/dashboard-viewer.component';
import { AuthGuardService } from '../app-core/auth/services/auth-guard.service';

const routes: Routes = [
    { path: 'viewer', component: DashboardViewerComponent, pathMatch: 'full', canActivate: [AuthGuardService] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

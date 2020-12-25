import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app-core/auth/services/auth-guard.service';
import { RoleContainerComponent } from './role/containers/role-container/role-container.component';

const routes: Routes = [
    { path: 'roles', component: RoleContainerComponent, canActivate: [AuthGuardService] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppSecurityRoutingModule { }

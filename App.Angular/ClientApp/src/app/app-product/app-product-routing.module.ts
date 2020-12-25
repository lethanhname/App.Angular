import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app-core/auth/services/auth-guard.service';
import { StockGroupListComponent } from './stock-group/containers/stock-group-list/stock-group-list.component';
import { StockTypeListComponent } from './stock-type/containers/stock-type-list/stock-type-list.component';

const routes: Routes = [
    { path: 'stock-group', component: StockGroupListComponent },
    { path: 'stock-type', component: StockTypeListComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppProductRoutingModule { }

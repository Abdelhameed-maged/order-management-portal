import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersGridComponent } from './components/orders-grid/orders-grid.component';

const routes: Routes = [
  { path: '', component: OrdersGridComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

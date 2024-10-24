import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersGridComponent } from './components/orders-grid/orders-grid.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { OrderResolver } from 'src/app/api/services/order.resolver';

const routes: Routes = [
  { path: '', component: OrdersGridComponent},
    { path: 'order/:id', component: OrderPageComponent, resolve: { order: OrderResolver } },

   

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

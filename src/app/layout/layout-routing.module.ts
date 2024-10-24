import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule) },
    { path: 'orders', loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule) },
    { path: 'order-wizard', loadChildren: () => import('./order-wizard/order-wizard.module').then(mod => mod.OrderWizardModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
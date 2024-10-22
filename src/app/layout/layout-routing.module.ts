import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', loadChildren: () =>
            import('./products/products.module').then(mod => mod.ProductsModule)
    },
    { path: 'orders', loadChildren: () =>
        import('./orders/orders.module').then(mod => mod.OrdersModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
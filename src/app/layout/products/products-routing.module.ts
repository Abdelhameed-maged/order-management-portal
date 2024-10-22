import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsWrapperComponent } from './components/products-wrapper/products-wrapper.component';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

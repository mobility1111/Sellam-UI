import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CreateProductAdComponent } from './components/create-product-ad/create-product-ad.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAdListComponent } from './components/product-ad-list/product-ad-list.component';
import { ProductAdDetailComponent } from './components/product-ad-detail/product-ad-detail.component';
import { EditProductAdComponent } from './components/edit-product-ad/edit-product-ad.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'category-edit/:id', component: EditCategoryComponent },
  { path: 'category-detail/:id', component: CategoryDetailComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'product-ads', component: ProductAdListComponent },
  { path: 'create-product-ad', component: CreateProductAdComponent },
  { path: 'product-ad/:id', component: ProductAdDetailComponent },
  { path: 'edit-product-ad/:id', component: EditProductAdComponent },
  { path: 'login', component:   LoginComponent},
  { path: 'users', component: UserListComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
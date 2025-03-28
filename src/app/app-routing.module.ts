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
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: 'categories', canMatch: [authGuard], component: CategoryListComponent },
  { path: 'category-form', canMatch: [authGuard], component: CategoryFormComponent },
  { path: 'category-edit/:id', canMatch: [authGuard], component: EditCategoryComponent },
  { path: 'category-detail/:id', canMatch: [authGuard], component: CategoryDetailComponent },
  { path: 'companies', canMatch: [authGuard], component: CompaniesComponent },
  { path: 'company/:id', canMatch: [authGuard], component: CompanyDetailComponent },
  { path: 'products', canMatch: [authGuard], component: ProductListComponent },
  { path: 'products/:id', canMatch: [authGuard], component: ProductDetailComponent },
  { path: 'product-ads', canMatch: [authGuard], component: ProductAdListComponent },
  { path: 'create-product-ad', canMatch: [authGuard], component: CreateProductAdComponent },
  { path: 'product-ad/:id', canMatch: [authGuard], component: ProductAdDetailComponent },
  { path: 'edit-product-ad/:id', canMatch: [authGuard], component: EditProductAdComponent },
  { path: 'login', component:   LoginComponent},
  { path: 'users', canMatch: [authGuard], component: UserListComponent},
  { path: 'users/:userId', canMatch: [authGuard], component: UserDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notifications', component:   NotificationsComponent},
  { path: 'banners', component:   BannerListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
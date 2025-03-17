import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductAdComponent } from './components/create-product-ad/create-product-ad.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { EditProductAdComponent } from './components/edit-product-ad/edit-product-ad.component';
import { ProductAdToggleComponent } from './components/product-ad-toggle/product-ad-toggle.component';
import { ProductAdListComponent } from './components/product-ad-list/product-ad-list.component';
import { ProductAdDetailComponent } from './components/product-ad-detail/product-ad-detail.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CategoryDetailComponent,
    EditCategoryComponent,
    CompaniesComponent,
    CompanyDetailComponent,

    ProductListComponent,
    CreateProductAdComponent,
    ProductDetailComponent,
    EditProductAdComponent,
    ProductAdToggleComponent,
    ProductAdListComponent,
    ProductAdDetailComponent,
    LoginComponent,
    NavBarComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

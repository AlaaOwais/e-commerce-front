import { ProductCardComponent } from './../pages/product-card/product-card.component';
import { AuthComponent } from './../layout/auth/auth.component';
import { Routes } from '@angular/router';
import { MainComponent } from '../layout/main/main.component';
import { authGuard } from '../core/guards/auth/auth.guard';
import { loggedGuard } from '../core/guards/logged/logged.guard';

export const routes: Routes = [
  {path:"" , redirectTo:"home", pathMatch:'full'},
  {path:"" , component:MainComponent, canActivate:[authGuard] , title: "main" , children:[
    {path:"home" , loadComponent:()=> import('../pages/home/home.component').then(c=> c.HomeComponent), title:"home"},
    {path:"categories" , loadComponent:()=> import('../pages/categories/categories.component').then(c=> c.CategoriesComponent) , title:"categories"},
    {path:"category/:id" , loadComponent:()=> import('../pages/category/category.component').then(c=> c.CategoryComponent) , title:"category"},
    {path:"detailes/:id" , loadComponent:()=> import('../pages/details/details.component').then(c=> c.DetailsComponent), title:"detailes"},
    {path:"products" , loadComponent:()=> import('../pages/products/products.component').then(c=> c.ProductsComponent) , title:"products"},
    {path:"prod-card/:id" , loadComponent:()=> import('../pages/product-card/product-card.component').then(c=> c.ProductCardComponent) , title:"products"},
    {path:"prod-card" , loadComponent:()=> import('../pages/product-card/product-card.component').then(c=> c.ProductCardComponent) , title:"products"},
    {path:"brands" , loadComponent:()=> import('../pages/brands/brands.component').then(c=> c.BrandsComponent)  , title:"Brands"},
    {path:"cart" , loadComponent:()=> import('../pages/cart/cart.component').then(c=> c.CartComponent)  , title:"cart"},
    {path:"checkout/:id" , loadComponent:()=> import('../pages/checkout/checkout.component').then(c=> c.CheckoutComponent)  , title:"checkout"},
    {path:"allorders" , loadComponent:()=> import('../pages/allorders/allorders.component').then(c=> c.AllordersComponent)  , title:"All orders"},
    {path:"wishlist" , loadComponent:()=> import('../pages/wishlist/wishlist.component').then(c=> c.WishlistComponent)  , title:"All orders"},
  ]},
  {path:"" , component:AuthComponent, canActivate:[loggedGuard] , title: "auth", children:[
    {path:"login" , loadComponent:()=> import('../pages/login/login.component').then(c=> c.LoginComponent)  , title:"LogIn"},
    {path:"register" , loadComponent:()=> import('../pages/register/register.component').then(c=> c.RegisterComponent) , title:"Register"},
    {path:"forgot" , loadComponent:()=> import('../pages/forgot-password/forgot-password.component').then(c=> c.ForgotPasswordComponent) , title:"forgot password"},
  ]},
  {path:'*' , loadComponent:()=> import('../pages/notfound/notfound.component').then(c=> c.NotfoundComponent) , title: "Not found!"},
];

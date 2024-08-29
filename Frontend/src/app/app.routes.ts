import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login', loadComponent:() => import('./pages/login/login.component')},
    {path:'register', loadComponent:() => import('./pages/register/register.component')},
    {path:'forget-password', loadComponent:() => import('./pages/forget-password/forget-password.component')},
    {path:'reset/:token', loadComponent:() => import('./pages/reset/reset.component')},
    {path:'home', loadComponent:() => import('./pages/home/home.component')},
    {path:'product-page/:id', loadComponent:() => import('./pages/product-page/product-page.component')},
    {path:'cart', loadComponent:() => import('./pages/cart-page/cart-page.component')},
    {path:'checkout',loadComponent:()=> import('./pages/checkout-page/checkout-page.component')},
    {path:'joint-cart', loadComponent:() => import('./pages/joint-cart/joint-cart.component')},
    {path:'chat', loadComponent:()=>import('./pages/chat/chat.component')}
];

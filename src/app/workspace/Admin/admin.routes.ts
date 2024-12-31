import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent), children:[
        { path: 'dashboard', loadComponent: () => import('./admin-home/dashboard/dashboard.component').then(m => m.DashboardComponent)},
        { path:'**', redirectTo:'dashboard', pathMatch:'full' },
    ]},
    { path:'**', redirectTo:'', pathMatch:'full' },
];
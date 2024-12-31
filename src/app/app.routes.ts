import { Routes } from '@angular/router';
import { AuthGuard } from './auth-material/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    // { path: 'admin', canActivate:[AuthGuard], loadComponent: () => import('./workspace/Admin/admin-home/admin-home.component').then(m => m.AdminHomeComponent) },
    // { path: 'client', canActivate:[AuthGuard], loadComponent: () => import('./workspace/Clients/client-home/client-home.component').then(m => m.ClientHomeComponent) },
    {path: 'admin', loadChildren: () => import('./workspace/Admin/admin.routes').then(m => m.routes)},
    {path: 'client', loadChildren: () => import('./workspace/Clients/client.routes').then(m => m.routes)},
    { path:'**', redirectTo:'', pathMatch:'full' },
];

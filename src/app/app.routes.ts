import { Routes } from '@angular/router';
import { AuthGuard } from './auth-material/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'workspace', canActivate:[AuthGuard], loadComponent: () => import('./workspace/workspace.component').then(m => m.WorkspaceComponent) },
    { path:'**', redirectTo:'', pathMatch:'full' },
];

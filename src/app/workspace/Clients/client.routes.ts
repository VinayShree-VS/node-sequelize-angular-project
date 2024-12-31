import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./client-home/client-home.component').then(m => m.ClientHomeComponent) },

    { path:'**', redirectTo:'', pathMatch:'full' },
];
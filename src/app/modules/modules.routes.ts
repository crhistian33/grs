import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { authGuard } from "@guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.routes").then(m => m.routes),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: HomeComponent,
        data: { breadcrumb: 'Inicio' }
      },
      {
        path: 'maestros',
        loadChildren: () => import('./masters/masters.routes').then(m => m.routes),
        data: { breadcrumb: 'Maestros' }
      }
    ]
  }
]

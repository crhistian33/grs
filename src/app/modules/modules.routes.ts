import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { authGuard } from "@guards/auth.guard";
import { hasRoleGuard } from "@guards/has-role.guard";
import { Roles } from "@models/masters/user.model";

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
        canActivate: [hasRoleGuard([Roles.ADMIN, Roles.SUPERVISOR])],
        loadChildren: () => import('./masters/masters.routes').then(m => m.routes),
        data: { breadcrumb: 'Maestros' }
      }
    ]
  }
]

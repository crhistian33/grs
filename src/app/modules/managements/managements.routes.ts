import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'asignaciones',
    loadChildren: () => import('./assign/assign.routes').then(m => m.routes),
    data: { breadcrumb: 'Asignaciones' },
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./assist/assist.routes').then(m => m.routes),
    data: { breadcrumb: 'Asistencias' },
  },
  {
    path: 'descansos',
    loadChildren: () => import('./break-worker/break.routes').then(m => m.routes),
    data: { breadcrumb: 'Descansos' },
  },
  {
    path: 'permisos',
    loadChildren: () => import('./permission/permission.routes').then(m => m.routes),
    data: { breadcrumb: 'Permisos' },
  },
]

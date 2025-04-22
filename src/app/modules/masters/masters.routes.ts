import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "centros",
    loadChildren: () => import("./center/center.routes").then(m => m.routes),
    data: { breadcrumb: 'centros' },
  },
  {
    path: "tipos-trabajador",
    loadChildren: () => import("./typeworker/typeworker.routes").then(m => m.routes),
    data: { breadcrumb: 'tipos de trabajador' },
  },
  {
    path: "turnos",
    loadChildren: () => import("./shift/shift.routes").then(m => m.routes),
    data: { breadcrumb: 'turnos' },
  },
  {
    path: "trabajadores",
    loadChildren: () => import("./worker/worker.routes").then(m => m.routes),
    data: { breadcrumb: 'trabajadores' },
  },
  {
    path: "empresas",
    loadChildren: () => import("./company/company.routes").then(m => m.routes),
    data: { breadcrumb: 'empresas' },
  },
  {
    path: "clientes",
    loadChildren: () => import("./customer/customer.routes").then(m => m.routes),
    data: { breadcrumb: 'clientes' },
  },
  {
    path: "unidades",
    loadChildren: () => import("./unit/unit.routes").then(m => m.routes),
    data: { breadcrumb: 'unidades' },
  }
]

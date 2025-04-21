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
  }
]

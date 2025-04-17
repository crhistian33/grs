import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "demo",
    loadChildren: () => import("./demo/demo.routes").then(m => m.routes),
    data: { breadcrumb: 'Demos' },
  }
]

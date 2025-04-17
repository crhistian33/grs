import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { TrashedComponent } from "./trashed/trashed.component";
import { authGuard } from "@guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: ListComponent,
    canActivate: [authGuard],
  },
  {
    path: "papelera",
    component: TrashedComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Papelera' },
  }
]

import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "../../layouts/auth-layout/auth-layout.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
]

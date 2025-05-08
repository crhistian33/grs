import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Roles } from '@models/masters/user.model';
import { HasRoleDirective } from '@shared/directives/has-role.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HasRoleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Roles = Roles;
}

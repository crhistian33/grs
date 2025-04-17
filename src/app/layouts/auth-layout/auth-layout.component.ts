import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}

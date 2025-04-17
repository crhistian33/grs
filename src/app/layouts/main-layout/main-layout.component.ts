import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLeftComponent } from '../../shared/components/nav-left/nav-left.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeaderPageComponent } from '../../shared/components/header-page/header-page.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavLeftComponent, HeaderComponent, HeaderPageComponent, LoadingComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}

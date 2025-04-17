import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { Store } from '@ngxs/store';
import { AuthActions } from '@states/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TieredMenu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);
  private toggleStateService = inject(ToggleStateService);
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Mi perfil',
        icon: 'pi pi-user',
      },
      {
        separator: true
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => { this.onLogout() }
      }
    ]
  }

  toggleMobileSidebar() {
    this.toggleStateService.toggleNav();
    this.toggleStateService.toggleExpanded();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';
import { Store } from '@ngxs/store';
import { AuthActions } from '@states/auth/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from '@states/auth/auth.state';
import { User } from '@models/masters/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, TieredMenu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);
  private toggleStateService = inject(ToggleStateService);
  items: MenuItem[] | undefined;

  user$: Observable<User | null> = this.store.select(AuthState.getUserProfile);
  isAuthenticated$: Observable<boolean> = this.store.select(AuthState.getAuthenticated);

  ngOnInit() {
    this.items = [
      { label: 'Mi perfil', icon: 'pi pi-user'},
      { separator: true },
      { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => { this.onLogout() } }
    ]

    const user = this.store.selectSnapshot(AuthState.getUserProfile);
    const isAuthenticated = this.store.selectSnapshot(AuthState.getAuthenticated);

    if(isAuthenticated && !user) {
      this.store.dispatch(new AuthActions.Profile());
    }
  }

  toggleMobileSidebar() {
    this.toggleStateService.toggleNav();
    this.toggleStateService.toggleExpanded();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout);
  }
}

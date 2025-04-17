import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ToggleStateService } from '@shared/services/ui/togglestate.service';

@Component({
  selector: 'app-nav-left',
  imports: [CommonModule, InputIconModule, ButtonModule, SidebarModule, RouterLink, RouterLinkActive, TooltipModule],
  templateUrl: './nav-left.component.html',
  styleUrl: './nav-left.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
})
export class NavLeftComponent {
  private toggleStateService = inject(ToggleStateService);

  mobileSidebarVisible = this.toggleStateService.navState;
  expanded = this.toggleStateService.isExpanded;
  isMobile = false;

  menuItems = [
    { label: 'Inicio', icon: 'pi-home', route: '/inicio' },
    { label: 'Maestros', icon: 'pi-chart-bar', route: '/maestros' },
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.toggleStateService.setNavState(false);
    }
  }

  toggleMobileSidebar() {
    this.toggleStateService.toggleNav();
    this.toggleStateService.toggleExpanded();
  }

  onSidebarMouseEnter() {
    if (!this.isMobile) {
      this.toggleStateService.setIsExpanded(true);
    }
  }

  onSidebarMouseLeave() {
    if (!this.isMobile) {
      this.toggleStateService.setIsExpanded(false);
    }
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.toggleStateService.setNavState(false);
    }
  }
}

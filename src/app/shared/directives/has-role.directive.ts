import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User, UserRole } from '@models/masters/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from '@states/auth/auth.state';
import { Observable } from 'rxjs';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private readonly store = inject(Store);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  user$: Observable<User | null> = this.store.select(AuthState.getUserProfile);

  @Input('hasRole') set roles(requiredRoles: UserRole[]) {
    this.user$.subscribe((user) => {
      this.viewContainer.clear();

      if (user && user.role && requiredRoles.includes(user.role.name as UserRole))
        this.viewContainer.createEmbeddedView(this.templateRef);
    })
  }
}

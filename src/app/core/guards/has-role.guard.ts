import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserRole } from '@models/masters/user.model';
import { Store } from '@ngxs/store';
import { AuthState } from '@states/auth/auth.state';

export const hasRoleGuard = (roles: UserRole[]): CanActivateFn  => {
  return () => {
    const user = inject(Store).selectSnapshot(AuthState.getUserProfile);
    if(!user) return false;

    return roles.includes(user.role.name as UserRole);
  };
};

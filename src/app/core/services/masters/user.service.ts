import { Injectable } from '@angular/core';
import { User, UserRequest } from '@models/masters/user.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, UserRequest> {
  protected endpoint = 'users';
}

import { Injectable } from '@angular/core';
import { Center, CenterResquest } from '@models/masters/center.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CenterService extends BaseService<Center, CenterResquest> {
  protected endpoint = 'centers';
}

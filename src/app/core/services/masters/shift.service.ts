import { Injectable } from '@angular/core';
import { Shift, ShiftResquest } from '@models/masters/shift.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends BaseService<Shift, ShiftResquest> {
  protected endpoint = 'shifts';
}

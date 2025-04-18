import { Injectable } from '@angular/core';
import { Unit, UnitResquest } from '@models/masters/unit.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService<Unit, UnitResquest> {
  protected endpoint = 'units';
}

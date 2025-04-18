import { Injectable } from '@angular/core';
import { TypeWorker, TypeWorkerResquest } from '@models/masters/typeworker.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TypeWorkerService extends BaseService<TypeWorker, TypeWorkerResquest> {
  protected endpoint = 'type_workers';
}

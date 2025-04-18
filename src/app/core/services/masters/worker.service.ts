import { Injectable } from '@angular/core';
import { Worker, WorkerResquest } from '@models/masters/worker.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<Worker, WorkerResquest> {
  protected endpoint = 'workers';
}

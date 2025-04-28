import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { checkToken } from '@interceptors/auth.interceptor';
import { Worker, WorkerResquest } from '@models/masters/worker.model';
import { ApiResCollection } from '@shared/models/bases/response.model';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<Worker, WorkerResquest> {
  protected endpoint = 'workers';

  getCeased(): Observable<ApiResCollection<Worker>> {
    return this.http.get<ApiResCollection<Worker>>(`${environment.API_URL}/${this.endpoint}/getceased`, { context: checkToken() });
  }
}

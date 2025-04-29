import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { checkToken } from '@interceptors/auth.interceptor';
import { Worker, WorkerResquest } from '@models/masters/worker.model';
import { ApiResSingle } from '@shared/models/bases/response.model';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService extends BaseService<Worker, WorkerResquest> {
  protected endpoint = 'workers';

  renew(id: number, resource: Partial<WorkerResquest>): Observable<ApiResSingle<Worker>> {
    return this.http.patch<ApiResSingle<Worker>>(`${environment.API_URL}/${this.endpoint}/renew/${id}`, resource, { context: checkToken() });
  }
}

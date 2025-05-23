import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { checkToken } from '@interceptors/auth.interceptor';
import { BaseModel } from '@shared/models/bases/base.model';
import { ApiResCollection, ApiResSingle } from '@shared/models/bases/response.model';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { Store } from '@ngxs/store';
import { LayoutAction } from '@shared/states/layout/layout.actions';
import { AuthState } from '@states/auth/auth.state';
import { Roles } from '@models/masters/user.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends BaseModel, R> {
  protected http = inject(HttpClient);
  protected store = inject(Store);

  protected abstract endpoint: string;
  protected apiUrl = `${environment.API_URL}`;
  protected ENDPOINTS_ALL = ['centers', 'type_workers', 'shifts'];
  //protected mockMode = true;

  protected getUserRole() {
    return this.store.selectSnapshot(AuthState.getUserProfile)?.role.name;
  }

  getAll(): Observable<ApiResCollection<T>> {
    const role = this.getUserRole();
    if (role === Roles.ADMIN || this.ENDPOINTS_ALL.includes(this.endpoint))
      return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}`, { context: checkToken() });
    else
      return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/getbycompany`, { context: checkToken() });
  }

  getAllTrash(): Observable<ApiResCollection<T>> {
    const role = this.getUserRole();
    if (role === Roles.ADMIN || this.ENDPOINTS_ALL.includes(this.endpoint))
      return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/gettrashed`, { context: checkToken() });
    else
    return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/gettrashedbycompany`, { context: checkToken() });
  }

  getOptions(): Observable<ApiResCollection<T>> {
    const role = this.getUserRole();
    if (role === Roles.ADMIN || this.ENDPOINTS_ALL.includes(this.endpoint))
      return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/getoptions`, { context: checkToken() });
    else
      return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/getoptionsbycompany`, { context: checkToken() });
  }

  getOne(id: number): Observable<ApiResSingle<T>> {
    return this.http.get<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/${id}`, { context: checkToken() });
  }

  create(resource: R): Observable<ApiResSingle<T>> {
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}`, resource, { context: checkToken() });
  }

  update(id: number, resource: Partial<R>): Observable<ApiResSingle<T>> {
    return this.http.patch<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/${id}`, resource, { context: checkToken() });
  }

  delete(id: number): Observable<ApiResSingle<T>> {
    return this.http.delete<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/${id}`, { context: checkToken() });
  }

  deleteForce(id: number): Observable<ApiResSingle<T>> {
    return this.http.delete<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/destroy/${id}`, { context: checkToken() });
  }

  restore(id: number): Observable<ApiResSingle<T>> {
    return this.http.get<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/restore/${id}`, { context: checkToken() });
  }

  deleteAll(resources: T[]): Observable<ApiResCollection<T>> {
    return this.http.post<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/destroyes`, { resources }, { context: checkToken() });
  }

  deleteForceAll(resources: T[]): Observable<ApiResSingle<T>> {
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/destroyesforce`, { resources }, { context: checkToken() });
  }

  restoreAll(resources: T[]): Observable<ApiResCollection<T>> {
    return this.http.post<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/restores`, { resources }, { context: checkToken() });
  }

  // protected abstract getMockItems(): T[];

  // protected getMockData(): Observable<T[]> {
  //   return of(this.getMockItems() as T[]);
  // }
}

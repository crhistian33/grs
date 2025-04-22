import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { checkToken } from '@interceptors/auth.interceptor';
import { BaseModel } from '@shared/models/bases/base.model';
import { ApiResCollection, ApiResSingle } from '@shared/models/bases/response.model';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { Store } from '@ngxs/store';
import { LayoutAction } from '@shared/states/layout/layout.actions';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends BaseModel, R> {
  protected abstract endpoint: string;
  protected apiUrl = `${environment.API_URL}`;
  //protected mockMode = true;

  protected http = inject(HttpClient);

  getAll(): Observable<ApiResCollection<T>> {
    return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}`, { context: checkToken() });
  }

  getAllTrash(): Observable<ApiResCollection<T>> {
    return this.http.get<ApiResCollection<T>>(`${this.apiUrl}/${this.endpoint}/gettrashed`, { context: checkToken() });
  }

  getOne(id: number): Observable<ApiResSingle<T>> {
    return this.http.get<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/${id}`, { context: checkToken() });
  }

  create(resource: R): Observable<ApiResSingle<T>> {
    //Usando el userID del usuario autenticado
    // const userID = this.store.selectSnapshot(UserState.getCurrentUserID);
    // const newResources = {
    //   ...resource,
    //   created_by: userID
    // };
    const newResources = {
      ...resource,
      created_by: 1
    };
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}`, newResources, { context: checkToken() });
  }

  update(id: number, resource: Partial<R>): Observable<ApiResSingle<T>> {
    //Usando el userID del usuario autenticado
    // const userID = this.store.selectSnapshot(UserState.getCurrentUserID);
    // const newResources = {
    //   ...resource,
    //   updated_by: userID
    // };
    const newResources = {
      ...resource,
      updated_by: 1
    };
    return this.http.patch<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/${id}`, newResources, { context: checkToken() });
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

  deleteAll(resources: T[]): Observable<ApiResSingle<T>> {
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/destroyes`, { resources }, { context: checkToken() });
  }

  deleteForceAll(resources: T[]): Observable<ApiResSingle<T>> {
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/destroyesforce`, { resources }, { context: checkToken() });
  }

  restoreAll(resources: T[]): Observable<ApiResSingle<T>> {
    return this.http.post<ApiResSingle<T>>(`${this.apiUrl}/${this.endpoint}/restores`, { resources }, { context: checkToken() });
  }

  // protected abstract getMockItems(): T[];

  // protected getMockData(): Observable<T[]> {
  //   return of(this.getMockItems() as T[]);
  // }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { checkToken } from '@interceptors/auth.interceptor';
import { ApiResSingle, AuthResponse } from '@shared/models/bases/response.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@models/masters/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.API_URL + '/auth';

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  refresh(refresh_token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refresh_token });
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`, { context: checkToken() });
  }

  profile(): Observable<ApiResSingle<User>> {
    return this.http.get<ApiResSingle<User>>(`${this.apiUrl}/profile`, { context: checkToken() });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequest } from '../../models/auth/RegisterRequest';
import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { LoginRequest } from '../../models/auth/LoginRequest';
import { User } from '../../models/auth/User';
import { UserExistsRequest, UserExistsResponse } from '../../models/auth/UserExistsInterface';
import { API_ENDPOINTS } from '../staticsValues';

@Injectable({
  providedIn: 'root'
})
// Service pour les opérations liées à l'authentification
export class AuthService {

  apiBaseUrl : String = environment.apiUrl;
  constructor( 
    private http: HttpClient
   ) {

    }

// Register a new user
register(userData: RegisterRequest) : Observable<User>
{
  let registerResponse = this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/register`, userData);
  return registerResponse.pipe(
    map(response => {
      localStorage.setItem('token', response.jwt);
      return response.user;
    })
  );

}

// Login an existing user
login(loginData: LoginRequest) : Observable<User>
{
  let loginResponse = this.http.post<AuthResponse>(`${this.apiBaseUrl}${API_ENDPOINTS.LOGIN}`, loginData);
  return loginResponse.pipe(
    map(response => {
      localStorage.setItem('token', response.jwt);
      return response.user;
    })
  );
}

// Get current user
getCurrentUser() : Observable<User>
{
  let token = localStorage.getItem('token') || '';
  let userProfileResponse = this.http.get<AuthResponse>(`${this.apiBaseUrl}${API_ENDPOINTS.USER_PROFILE}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return userProfileResponse.pipe(
    map(response => response.user)
  );

}

//check if user exists in database
checkUserExists(data: UserExistsRequest): Observable<UserExistsResponse> {
  return this.http.get<UserExistsResponse>(`${this.apiBaseUrl}${API_ENDPOINTS.USER_EXISTS.replace('{clientCode}', data.clientCode)}`);
}

//get token
getToken(): string | null {
  return localStorage.getItem('token');
}
}
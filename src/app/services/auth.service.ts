import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { User } from '../models/user.model';
import { LoginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('AuthService constructor - isPlatformBrowser:', isPlatformBrowser(this.platformId));
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
    }
  }

  login(dto: LoginDto): Observable<{ access_token: string }> {
    return this.http.post(`${this.apiUrl}/login`, dto, { 
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map((response: HttpResponse<string>) => {
        if (response.body && (response.status === 200 || response.status === 201)) {
          const token = response.body;
          if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem('access_token', token);
          }
          return { access_token: token };
        }
        throw new Error('Invalid response');
      })
    );
  }


  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/token';
import { Router } from '@angular/router';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  private apiUrl = 'https://null-pointers-quy4.onrender.com/auth/login';
  private url = 'https://null-pointers-quy4.onrender.com';
  private token: string | null = null;
  public userData: Token | null = null;
  constructor(private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.token = token;
      // this.userData = this.decodeToken(token);
    }
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, payload).pipe(
      tap((res) => {
        this.token = res.token;
        localStorage.setItem('auth_token', res.token); // opcional
        // this.userData = this.decodeToken(res.token); // 👈 decodificás y guardás el user
      })
    );
  }

  sendCodeForgetPassword(email: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email)
    return this.http.get<any>(`${this.url}/passwords/requestPasswordToken?email=${encodedEmail}`, );
  }

  changePassword(token: string, email: string, newpassword: any): Observable<any> {
    const encodedEmail = encodeURIComponent(email)
    const enToken = encodeURIComponent(token)
    return this.http.patch<any>(`${this.url}/passwords/changePasswordWithToken?token=${enToken}&email=${encodedEmail}`, newpassword);
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    // Elimina el token del almacenamiento local y de la variable de clase
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userInfo'); // Limpia los datos del usuario
    this.userData = null; // Limpia los datos del usuario
    this.token = null;
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  isAuthenticated(): boolean {
    // Devuelve true si hay token almacenado
    return !!this.token;
  }
  isLoggedIn(): boolean {
   return !!localStorage.getItem('auth_token'); 
  }

  setToken(token: string): void {
    this.token = token;
  }
}


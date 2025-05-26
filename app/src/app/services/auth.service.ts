import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}
interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3001/auth/login';
  private token: string | null = null;

  constructor(private http: HttpClient) {
  const token = localStorage.getItem('auth_token');
  if (token) {
    this.token = token;
    this.decodeToken(token);
  }
}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, payload).pipe(
      tap((res) => {
        this.token = res.token;
        localStorage.setItem('auth_token', res.token); // opcional
        this.decodeToken(res.token); // 👈 decodificás y guardás el user
      })
    );
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    this.token = null;
  }

  isAuthenticated(): boolean {
    // Devuelve true si hay token almacenado
    return !!this.token;
  }
  setToken(token: string): void {
    this.token = token;
  }

   public userData: DecodedToken | null = null;

  private decodeToken(token: string): void {
    try {
      this.userData = jwtDecode<DecodedToken>(token);
      console.log('Token decodificado y guardado:', this.userData);
    } catch (e) {
      console.error('No se pudo decodificar el token:', e);
      this.userData = null;
    }
  }

  // getuser(): DecodedToken | null {
  //   if (!this.userData && this.token) {
  //     this.decodeToken(this.token);
  //   }
  //   return this.userData;
  // }

}


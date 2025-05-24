import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return true;
  }
  
  
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfoSubject = new BehaviorSubject<User | null>(null);
  public userInfo$: Observable<User | null> = this.userInfoSubject.asObservable();

  constructor() {
    this.loadUserFromStorage(); // <-- Esto asegura que al recargar, la info se conserve
  }
  setUserInfo(user: User) {
    this.userInfoSubject.next(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUserInfo(): User | null {
    if (this.userInfoSubject.value) {
      return this.userInfoSubject.value;
    }

    const data = localStorage.getItem('userInfo');
    if (data) {
      const user = JSON.parse(data) as User;
      this.userInfoSubject.next(user);
      return user;
    }

    return null;
  }
  private loadUserFromStorage(): void {
    const data = localStorage.getItem('userInfo');
    if (data) {
      const user = JSON.parse(data);
      this.userInfoSubject.next(user);
    }
  }
  getUserRole() {
    // const userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const userData = this.getUserInfo();
    if (!userData) {
      return '';
    }
    return userData.role.roleName; // Asegúrate de que 'role' sea una propiedad válida en tu modelo User
  }
  clearUserInfo(): void {
    this.userInfoSubject.next(null);
    localStorage.removeItem('userInfo');
  }
}
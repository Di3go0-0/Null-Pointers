import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ){}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRoles: string[] = route.data['roles'];
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.userService.getUserRole();

    if (!isLoggedIn) {
      return this.router.parseUrl('/login');
    }

    if (expectedRoles && !expectedRoles.includes(userRole)) {
      // Si no tiene el rol correcto, lo redirige a su dashboard correcto
      return this.router.parseUrl(this.getRedirectPath(userRole));
    }

    return true;
  }

  private getRedirectPath(role: string): string {
    switch (role) {
      case 'ADMIN': return '/admin';
      case 'TEACHER': return '/teacher';
      case 'STUDENT': return '/student';
      default: return '/login';
    }
  }
}

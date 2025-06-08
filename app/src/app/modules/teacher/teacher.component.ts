import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
   // Propiedad para almacenar el estado del sidebar
  sidebarCollapsed = false;

  
  user: User | null = null;
  private subscription!: Subscription

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.userService.userInfo$.subscribe(info => {
      this.user = info;
      if (info) {
        console.log('Usuario actual:', info.name, info.email, info.role.roleName);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
  }

  navigateToModule(route: string) {
    // Por ahora solo mostramos una alerta, más tarde se implementarán las rutas
    alert(`Navegando a: ${route}`);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}

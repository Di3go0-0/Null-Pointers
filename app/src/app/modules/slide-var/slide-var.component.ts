import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-slide-var',
  imports: [CommonModule],
  templateUrl: './slide-var.component.html',
  styleUrl: './slide-var.component.css'
})
export class SlideVarComponent {
goToProfile() {
throw new Error('Method not implemented.');
}
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

}

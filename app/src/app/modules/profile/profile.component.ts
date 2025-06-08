import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { PersonalInfo } from '../../models/personal-info';
import { ApiService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  activeTab = 'personal';

  // Password change form
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  isChangingPassword = false;
  passwordMessage = '';
  passwordMessageType = '';


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private apiService: ApiService,
    private location: Location,
    private router: Router
  ) { }
  currentUser: User | null = null;
  private subscription!: Subscription;
  rol: string = '';
  personalInfo: PersonalInfo | null = null;

  ngOnInit() {
    this.subscription = this.userService.userInfo$.subscribe(info => {
      this.currentUser = info;
      this.rol = info?.role.roleName || '';
      this.personalInfo = info?.personalInfo || null;

      if (info) {
        console.log('Usuario actual:', info.name, info.email, info.role.roleName);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async changePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.showPasswordMessage('Por favor completa todos los campos', 'danger');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showPasswordMessage('Las contraseñas no coinciden', 'danger');
      return;
    }

    if (!this.currentUser?.email) {
      this.showPasswordMessage('No se pudo obtener el correo del usuario', 'danger');
      return;
    }

    this.isChangingPassword = true;

    try {
      await this.apiService.changePasswordWithOld(this.currentUser.email, {
        oldPassword: this.currentPassword,
        password: this.newPassword,
        confirmPassword: this.confirmPassword
      }).toPromise();

      this.showPasswordMessage('Contraseña actualizada correctamente', 'success');
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } catch (error: any) {
      const message = error?.error?.message || 'Error al cambiar la contraseña';
      this.showPasswordMessage(message, 'danger');
    } finally {
      this.isChangingPassword = false;
    }
  }


  showPasswordMessage(message: string, type: string) {
    this.passwordMessage = message;
    this.passwordMessageType = type;

    setTimeout(() => {
      this.passwordMessage = '';
      this.passwordMessageType = '';
    }, 5000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.location.back(); // Regresa a la ruta anterior en el historial
  }
}

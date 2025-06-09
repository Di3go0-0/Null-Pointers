import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/solicitudes.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  //valida que los datos del formulario sean correctos
  validarDatos() {
    //verifica que el correo electronico sea valido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos.');
      return false;
    }
    if (!emailPattern.test(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    this.isLoading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Token recibido:', res.token);

        // Guardar token
        this.authService.setToken(res.token);
        localStorage.setItem('auth_token', res.token);
        this.authService.setToken(res.token);
        this.apiService.post<User>('/auth/userInfo', {}).subscribe({
          next: (userData) => {
            this.userService.setUserInfo(userData);
            console.log('Datos del usuario guardados:', userData);
            if(userData.role.roleName === 'ADMIN') {
              this.router.navigate(['/admin']);
            }
            else if(userData.role.roleName === 'TEACHER') {
              this.router.navigate(['/teacher']);
            }
            else if(userData.role.roleName === 'STUDENT') {
              this.router.navigate(['/student']);
            }
          },
          error: (err) => {
            console.error('Error al obtener información del usuario', err);
          }
        });
      },
      error: (err) => {
        this.isLoading = false; // apago loader si hay error
        alert('Error en la autenticación: ' + (err.error?.message || err.message));
      }
    });
    return true;
  }

  recuperarContraseña() {
    return null;
  }

}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = '';
  token = '';
  password = '';
  confirmPassword = '';
  message = '';
  step = 1;
  loading = false;

  constructor(private authService: AuthService,private router: Router) {}

  sendCode() {
  this.loading = true;
  this.authService.sendCodeForgetPassword(this.email).subscribe({
    next: () => {
      this.message = 'Código enviado al correo electrónico.';
      this.step = 2;
      this.loading = false;
    },
    error: () => {
      this.message = 'Error al enviar el código. Verifica el correo.';
      this.loading = false;
    }
  });
}

verifyCode() {
  this.loading = true;
  setTimeout(() => {
    if (this.token.trim()) {
      this.message = 'Código verificado. Ingresa una nueva contraseña.';
      this.step = 3;
    } else {
      this.message = 'Código inválido.';
    }
    this.loading = false;
  }, 1000); // Simula carga
}

changePassword() {
  if (this.password !== this.confirmPassword) {
    this.message = 'Las contraseñas no coinciden.';
    return;
  }

  this.loading = true;

  const payload = {
    password: this.password,
    confirmPassword: this.confirmPassword
  };

  this.authService.changePassword(this.token, this.email, payload).subscribe({
    next: () => {
      this.message = 'Contraseña cambiada exitosamente. Puedes iniciar sesión.';
      this.step = 1;
      this.password = '';
      this.confirmPassword = '';
      this.token = '';
      this.email = '';
      this.loading = false;
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.message = 'Error al cambiar la contraseña. Verifica los datos.';
      console.error(err);
      this.loading = false;
    }
  });
}



}

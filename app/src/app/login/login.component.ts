import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
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
    return true;
  }

  recuperarContraseña() {
    return null;
  }

}

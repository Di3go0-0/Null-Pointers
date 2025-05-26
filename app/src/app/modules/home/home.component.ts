import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


interface AdminModule {
  title: string;
  description: string;
  icon: string;
  route: string;
  bgColor: string;
}


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Propiedad para almacenar el estado del sidebar
  sidebarCollapsed = false;

  adminModules: AdminModule[] = [
    {
      title: 'Registrar Usuario',
      description: 'Añadir un nuevo usuario al sistema',
      icon: 'bi-person-plus',
      route: '/admin/users/new',
      bgColor: 'bg-success'
    },
    {
      title: 'Gestionar Cursos de Extensión',
      description: 'Administrar cursos de extensión',
      icon: 'bi-book',
      route: '/admin/courses',
      bgColor: 'bg-warning'
    },
    {
      title: 'Gestionar Reportes',
      description: 'Crear informes y estadísticas',
      icon: 'bi-bar-chart',
      route: '/admin/reports',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Gestionar Asignaturas',
      description: 'Administrar asignaturas académicas',
      icon: 'bi-mortarboard',
      route: '/admin/subjects',
      bgColor: 'bg-primary'
    },
    {
      title: 'Gestionar Usuarios',
      description: 'Ver y editar usuarios existentes',
      icon: 'bi-people',
      route: '/admin/users',
      bgColor: 'bg-info'
    },
    {
      title: 'Crear Asignatura',
      description: 'Añadir una nueva asignatura',
      icon: 'bi-file-plus',
      route: '/admin/subjects/new',
      bgColor: 'bg-dark'
    }
  ];

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



import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface AdminModule {
  title: string;
  description: string;
  icon: string;
  route: string;
  bgColor: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  adminModules: AdminModule[] = [
    {
      title: 'Registrar Usuario',
      description: 'Añadir un nuevo usuario al sistema',
      icon: 'bi-person-plus',
      route: 'users/new',
      bgColor: 'bg-success'
    },
    {
      title: 'Gestionar Cursos de Extensión',
      description: 'Administrar cursos de extensión',
      icon: 'bi-book',
      route: 'courses',
      bgColor: 'bg-warning'
    },
    {
      title: 'Gestionar Reportes',
      description: 'Crear informes y estadísticas',
      icon: 'bi-bar-chart',
      route: 'reports',
      bgColor: 'bg-secondary'
    },
    {
      title: 'Gestionar Asignaturas',
      description: 'Administrar asignaturas académicas',
      icon: 'bi-mortarboard',
      route: 'asignatures',
      bgColor: 'bg-primary'
    },
    {
      title: 'Gestionar Usuarios',
      description: 'Ver y editar usuarios existentes',
      icon: 'bi-people',
      route: 'users',
      bgColor: 'bg-info'
    },
    {
      title: 'Crear Asignatura',
      description: 'Añadir una nueva asignatura',
      icon: 'bi-file-plus',
      route: 'asignatures/new',
      bgColor: 'bg-dark'
    }
  ];

  navigateToModule(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }
}
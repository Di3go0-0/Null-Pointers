import { Component, OnInit } from '@angular/core';
import { CourseInstancia } from '../../../../models/course-instancia';
import { Teacher } from '../../../../models/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../services/profesores.service';
import { CursosExtensionService } from '../../../../services/cursos-extension.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-instancia-ex',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-instancia-ex.component.html',
  styleUrl: './crear-instancia-ex.component.css'
})
export class CrearInstanciaExComponent implements OnInit {
  isLoading = false;
  materia: CourseInstancia;
  courseId: number = 0;
  statusOptions = ['Active', 'Planned', 'Cancelled', 'Finished'];
  teachers: Teacher[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private materiaService: CursosExtensionService
  ) {
    this.materia = new CourseInstancia(0, 0, 0, '', "", "", "", 'Draft');
  }

  ngOnInit(): void {
    // Obtener courseId desde la ruta
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.materia.extensionCourseId = this.courseId;
    this.loadTeachers();
  }
  loadTeachers(): void {
    this.teacherService.getTypesOfContract().subscribe({
      next: (contracts) => {
        // Busca el tipo de contrato con ID 2
        const contratoExtension = contracts.find(c => c.id === 2);
        if (!contratoExtension) {
          console.warn("Tipo de contrato con ID 2 no encontrado.");
          return;
        }

        // Ahora carga los profesores
        this.teacherService.getAllTeachers().subscribe({
          next: (data) => {
            // Filtra por el nombre del contrato
            this.teachers = data.filter(teacher => teacher.contractName === contratoExtension.typeName);
          },
          error: (err) => {
            console.error("Error al cargar profesores", err);
          }
        });
      },
      error: (err) => {
        console.error("Error al cargar tipos de contrato", err);
      }
    });
  }

  onSubmit(): void {
    // Validación de campos requeridos
    const camposObligatorios = [
      this.materia.groupCode,
      this.materia.teacherId,
      this.materia.startDate,
      this.materia.endDate,
      this.materia.maxStudents,
    ];

    const hayCampoVacio = camposObligatorios.some(c => !c || c.toString().trim() === '');
    if (hayCampoVacio) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    // Validar que el código de grupo sea único entre otras instancias
    this.materiaService.getAllInstancias().subscribe({
      next: (data) => {
        const duplicado = data.find(i =>
          i.groupCode === this.materia.groupCode &&
          i.id !== this.materia.id // Excluye la instancia actual
        );

        if (duplicado) {
          alert("Ya existe una instancia con ese código de grupo. Elija uno diferente.");
          return;
        }

        // Si pasa las validaciones, continuar con la actualización
        this.isLoading = true;
        this.materiaService.createInstanciaMateria(this.materia).subscribe({
          next: () => {
            alert("Instancia de materia creada exitosamente.");
            this.router.navigate(['/admin/courses/instancias', this.courseId]);
          },
          error: (err) => {
            console.error("Error alcrear instancia:", err);
            alert("Error al crear la instancia.");
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error("Error al validar código de grupo:", err);
        alert("Error al validar datos.");
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin/courses/instancias", this.courseId]);
  }
}
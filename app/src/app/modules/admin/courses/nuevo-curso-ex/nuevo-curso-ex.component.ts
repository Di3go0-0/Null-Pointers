import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Programa } from "../../../../models/programa";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Course } from "../../../../models/course";
import { CursosExtensionService } from "../../../../services/cursos-extension.service";
@Component({
  selector: 'app-nuevo-curso-ex',
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-curso-ex.component.html',
  styleUrl: './nuevo-curso-ex.component.css'
})
export class NuevoCursoExComponent {
subjectId: number | null = null;
  isLoading = false;
  isEditing = false;

  materia: Course = new Course(0, 0, '', '','',0); // inicia vacío
  programas: Programa[] = [];

  constructor(
    private router: Router,
    private materiaService: CursosExtensionService
  ) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.materiaService.getAllPrograms().subscribe({
      next: (data) => {
        this.programas = data;
      },
      error: (err) => {
        console.error("Error al cargar programas", err);
      }
    });
  }


  onSubmit(): void {
    // Validar campos obligatorios
    if (
      !this.materia.courseName.trim() ||
      !this.materia.courseCode.trim() ||
      !this.materia.description.trim() ||
      !this.materia.durationHours ||
      !this.materia.programId
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    if (this.materia.durationHours >= 80) {
      alert('La duración en horas no puede ser mayor que 80.');
      return;
    }
    this.isLoading = true;
    this.materiaService.createMateria(this.materia).subscribe({
      next: (idMateriaCreada) => {
        console.log('curso creado con ID:', idMateriaCreada);
        alert('Materia creada exitosamente. con ID: ' + idMateriaCreada);
        this.router.navigate(['/admin/courses']); // o a donde necesites redirigir
      },
      error: (error) => {
        console.error('Error al crear la materia:', error);
        alert('Error al crear la materia. Por favor, inténtelo de nuevo.');
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin/courses"]);
  }
}

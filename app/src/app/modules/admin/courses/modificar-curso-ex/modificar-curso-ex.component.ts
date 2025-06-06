import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Programa } from "../../../../models/programa";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Course } from "../../../../models/course";
import { CursosExtensionService } from "../../../../services/cursos-extension.service";

@Component({
  selector: 'app-modificar-curso-ex',
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar-curso-ex.component.html',
  styleUrl: './modificar-curso-ex.component.css'
})
export class ModificarCursoExComponent implements OnInit {

  subjectId: number | null = null;
  isLoading = false;
  isEditing = false;

  materia: Course = new Course(0, 0, '', '', '', 0); // inicia vacío
  programas: Programa[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materiaService: CursosExtensionService
  ) {}

  ngOnInit(): void {
    // Cargar programas
    this.materiaService.getAllPrograms().subscribe({
      next: (data) => {
        this.programas = data;
      },
      error: (err) => {
        console.error("Error al cargar programas", err);
      }
    });

    // Cargar datos de la materia si se está editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.subjectId = +params['id'];
        this.isEditing = true;
        this.loadSubject();
      }
    });
  }

  loadSubject(): void {
    if (!this.subjectId) return;

    this.isLoading = true;
    this.materiaService.getAllMaterias().subscribe({
      next: (materias) => {
        const materia = materias.find((m) => m.id === this.subjectId);
        if (materia) {
          this.materia = new Course(
            materia.id,
            materia.programId,
            materia.courseName,
            materia.courseCode,
            materia.description,
            materia.durationHours
          );
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error al cargar la materia", error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.subjectId) return;

    this.isLoading = true;
    this.materiaService.updateMateria(this.subjectId, this.materia).subscribe({
      next: () => {
        this.isLoading = false;
        alert("Materia actualizada correctamente");
        this.router.navigate(["/admin/courses"]);
      },
      error: (err) => {
        console.error("Error al guardar", err);
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin/courses"]);
  }
}
{

}

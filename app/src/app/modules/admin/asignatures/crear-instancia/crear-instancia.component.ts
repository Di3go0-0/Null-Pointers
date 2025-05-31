import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MateriasService } from "../../../../services/materias.service";
import { MateriaInstanciada } from "../../../../models/materia-instanciada";
import { Teacher } from "../../../../models/teacher"; 
import { TeacherService } from "../../../../services/profesores.service";

@Component({
  selector: 'app-crear-instancia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-instancia.component.html',
  styleUrl: './crear-instancia.component.css'
})
export class CrearInstanciaComponent implements OnInit {
  isLoading = false;
  materia: MateriaInstanciada;
  courseId: number = 0;
  statusOptions = ['Active', 'Planned', 'Cancelled', 'Finished'];
  teachers: Teacher[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private materiaService: MateriasService
  ) {
    this.materia = new MateriaInstanciada(0, 0, 0, '', '', "", "", 1, 30, 'Planned');
  }

  ngOnInit(): void {
    // Obtener courseId desde la ruta
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.materia.courseId = this.courseId;
    this.loadTeachers();
  }
  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (err) => {
        console.error("Error al cargar profesores", err);
      }
    });
  }

  onSubmit(): void {
    // Validar campos mínimos
    if (!this.materia.semester || !this.materia.groupCode || !this.materia.teacherId) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    this.isLoading = true;
    this.materiaService.createInstanciaMateria(this.materia).subscribe({
      next: () => {
        alert("Instancia de materia creada exitosamente.");
        this.router.navigate(['/admin/asignatures']);
      },
      error: (err) => {
        console.error("Error al crear instancia:", err);
        alert("Error al crear instancia.");
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin/asignatures/instancias", this.courseId]);
  }
}

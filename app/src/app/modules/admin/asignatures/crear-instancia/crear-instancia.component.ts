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
  // Validación de campos requeridos
  const camposObligatorios = [
    this.materia.semester,
    this.materia.groupCode,
    this.materia.teacherId,
    this.materia.startDate,
    this.materia.endDate,
    this.materia.minStudents,
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
          this.router.navigate(['/admin/asignatures']);
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
    this.router.navigate(["/admin/asignatures/instancias", this.courseId]);
  }
}

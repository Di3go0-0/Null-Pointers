import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MateriasService } from "../../../../services/materias.service";
import { MateriaInstanciada } from "../../../../models/materia-instanciada";
import { Teacher } from "../../../../models/teacher";
import { TeacherService } from "../../../../services/profesores.service";

@Component({
  selector: 'app-modificar-instancia',
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar-instancia.component.html',
  styleUrl: './modificar-instancia.component.css'
})
export class ModificarInstanciaComponent implements OnInit {
  isLoading = false;
  materia: MateriaInstanciada;
  materiaId: number = 0;
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
    this.materiaId = Number(this.route.snapshot.paramMap.get('id'));
    this.materia.id = this.materiaId;
    this.loadTeachers();
    this.loadInstancias();
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
  loadInstancias(): void {
    this.materiaService.getAllInstancias().subscribe({
      next: (data) => {
        const instancia = data.find(i => i.id === this.materiaId);
        if (instancia) {
          this.materia = instancia;
          this.materia.startDate = this.materia.startDate.split('T')[0];
          this.materia.endDate = this.materia.endDate.split('T')[0];
        } else {
          console.error("Instancia no encontrada");
        }
      },
      error: (err) => {
        console.error("Error al cargar instancias", err);
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
      this.materia.status
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
        this.materiaService.updateInstanciaMateria(this.materiaId, this.materia).subscribe({
          next: () => {
            alert("Instancia de materia modificada exitosamente.");
            this.router.navigate(['/admin/asignatures']);
          },
          error: (err) => {
            console.error("Error al modificar instancia:", err);
            alert("Error al modificar instancia. :" + err.message);
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
    this.router.navigate(["/admin/asignatures"]);
  }
}



import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MateriasService } from "../../../../services/materias.service";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HorarioMateria } from "../../../../models/horario-materia";
import { HorarioCourse } from "../../../../models/horario-course";
import { CursosExtensionService } from "../../../../services/cursos-extension.service";

@Component({
  selector: 'app-horario-instancia-ex',
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-instancia-ex.component.html',
  styleUrl: './horario-instancia-ex.component.css'
})
export class HorarioInstanciaExComponent implements OnInit {
  deleteSubject(arg0: number) {
    if (confirm("¿Está seguro de que desea eliminar este horario?")) {
      this.materiasService.deleteHorarioMateria(arg0).subscribe({
        next: () => {
          alert("Horario eliminado correctamente.");
          this.loadHorarios();
        },
        error: (error) => {
          console.error("Error al eliminar el horario:", error);
          alert("Error al eliminar el horario. Por favor, inténtelo de nuevo más tarde.");
        }
      });
    }
  }
  addSubject() {
    this.router.navigate([`admin/courses/instancias/Horario/crear`, this.instanciaId]);
  }
  horarios: HorarioCourse[] = [];
  isLoading = false;
  instanciaId: number = 0;
  nombreDelCurso: string = "";

  constructor(
    private materiasService: CursosExtensionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.instanciaId = +params['id'];
        this.loadHorarios();
        this.loadNombreCurso();
      }
    });
  }

  /**
   * Cargar los horarios de la instancia actual
   */
  loadHorarios(): void {
    this.isLoading = true;
    this.materiasService.getHorariosById(this.instanciaId).subscribe({
      next: (data) => {
        this.horarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error al cargar horarios:", error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Obtener el nombre del curso desde el id de la instancia
   */
  loadNombreCurso(): void {
    this.materiasService.getCourseNameByInstanciaId(this.instanciaId).subscribe({
      next: (nombre) => {
        this.nombreDelCurso = nombre;
      },
      error: (err) => {
        console.error("Error al obtener el nombre del curso:", err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin/courses"]);
  }
  translateDayToSpanish(day: string): string {
    const daysMap: { [key: string]: string } = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo'
    };

    return daysMap[day] || day;
  }
  formatHour(hour: number): string {
    const date = new Date();
    date.setHours(hour, 0, 0); // hora:minutos:segundos
    return new Intl.DateTimeFormat('es-CO', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date); // Ejemplo: "2:00 p. m."
  }


}
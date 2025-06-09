import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MateriaInstanciada } from '../../../models/materia-instanciada';
import { Materia } from '../../../models/materia';
import { MateriasService } from '../../../services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';
import { HorarioMateria } from '../../../models/horario-materia';
import { StudentService } from '../../../services/student.service';
interface inscripcion {
  studentId: number;
  courseInstanceId: number;
  enrollmentDate: string; // Date
}
@Component({
  selector: 'app-inscribir-materia',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscribir-materia.component.html',
  styleUrl: './inscribir-materia.component.css'
})
export class InscribirMateriaComponent implements OnInit {
  subjects: MateriaInstanciada[] = []
  filteredSubjects: MateriaInstanciada[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Materia[] = []
  teachersMap: { [id: number]: string } = {};
  isEditing: any
  horarios: HorarioMateria[] = [];

  constructor(
    private materiasService: MateriasService,
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: TeacherService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    // Cargar datos de la materia si se está editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.materiaId = +params['id'];
        this.loadMateria();
        this.loadSubjects();
      }
    });
    // carga los profesores
    this.profesorService.getAllTeachers().subscribe({
      next: (profesores) => {
        this.teachersMap = profesores.reduce((map, profesor) => {
          map[profesor.id] = profesor.name;
          return map;
        }, {} as { [id: number]: string });
      },
      error: (err) => {
        console.error('Error cargando profesores:', err);
      }
    });
  }
  loadMateria(): void {
    this.materiasService.getMateriaById(this.materiaId).subscribe({
      next: (materia) => {
        this.materia = materia
        console.log("Materia loaded:", this.materia);
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading materia:", error)
        this.isLoading = false
      }
    })
  }

  loadSubjects(): void {
    this.isLoading = true;
    this.materiasService.getAllInstancias().subscribe({
      next: (allSubjects) => {
        // Filtrar solo aquellas instancias que coincidan con el materiaId actual
        const filtered = allSubjects.filter(i => i.courseId === this.materiaId);

        this.subjects = filtered;
        this.filteredSubjects = filtered;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading subjects:", error);
        this.isLoading = false;
      },
    });
  }
  obtenerProfesorNombre(profesorId: number) {
    this.profesorService.getAllTeachers().subscribe(profesores => {
      const profesor = profesores.find(p => p.id === profesorId);
      if (!profesor) {
        console.error("Profesor not found with ID:", profesorId);
        return "Desconocido";
      }
      console.log("Profesor found:", profesor.name); // Log the teacher's name
      // Return the teacher's name
      return profesor.name;
    }, error => {
      console.error("Error fetching teacher name:", error);
      return "Desconocido";
    });
  }
  obtenerProgramaNombre(programaId: number) {
    this.materiasService.getProgramNameById(programaId).subscribe(programa => {
      console.log(programa.programName); // Ciencias de la Computacion
      return programa.programName;
    }, error => {
      console.error("Error fetching program name:", error);
      return "Desconocido";
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSubjects = this.subjects
      return
    }

    this.filteredSubjects = this.subjects.filter(
      (subject) =>
        subject.semester.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  inscribirse(instId: number): void {
    this.studentService.getId().subscribe({
      next: (studentId) => {
        // Obtener inscripciones del estudiante
        this.materiasService.getEnrollmentMAteriasByStudentId(studentId).subscribe({
          next: (enrollments) => {
            const inscripcionExistente = enrollments.find(e => e.courseInstanceId === instId);

            if (inscripcionExistente) {
              if (inscripcionExistente.status === 'Enrolled') {
                alert('Ya estás inscrito en esta materia.');
                return;
              }

              const updatedInscripcion = {
                ...inscripcionExistente,
                status: 'Enrolled'
              };

              this.studentService.cancelarMateria(inscripcionExistente.id, updatedInscripcion).subscribe({
                next: () => {
                  alert('Inscripción reactivada correctamente.');
                  this.router.navigate(['/student/asignaturas']);
                },
                error: (err) => {
                  console.error('Error reactivando inscripción:', err);
                  alert('Error al reactivar la inscripción.');
                }
              });

            } else {
              // Crear nueva inscripción
              const fechaUTC = new Date();
              fechaUTC.setUTCHours(0, 0, 0, 0);

              const inscripcionData: inscripcion = {
                studentId: studentId,
                courseInstanceId: instId,
                enrollmentDate: fechaUTC.toISOString()
              };

              this.studentService.enrollmentStudentInMateria(inscripcionData).subscribe({
                next: (id) => {
                  if (id) {
                  this.studentService.ingresaANotas(id).subscribe({
                    next: () => {
                      console.log('Notas ingresadas correctamente para la inscripción:', id);
                    },
                    error: (error) => {
                      console.error('Error ingresando notas:', error);
                      alert('Error al ingresar notas para la inscripción.');
                    }
                  });  
                  alert('Inscripción exitosa en la materia.');
                  this.router.navigate(['/student/asignaturas']);
                  }
                },
                error: (error) => {
                  console.error('Error al inscribirse:', error);
                  alert('Error al inscribirse en la materia.');
                }
              });
            }
          },
          error: (err) => {
            console.error('Error obteniendo inscripciones:', err);
          }
        });
      },
      error: (error) => {
        console.error("Error al obtener el ID del estudiante:", error);
      }
    });
  }
  loadHorarios(Id: number): void {
    this.materiasService.getHorariosById(Id).subscribe({
      next: (data) => {
        this.horarios = data;
        if (this.horarios.length > 0) {
          this.showInfoModal(this.horarios);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error al cargar horarios:", error);
        this.isLoading = false;
      }
    });
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
  selectedSubject: HorarioMateria[] | null = null;

  showInfoModal(subject: HorarioMateria[]): void {
    this.selectedSubject = subject;
  }

  closeModal(): void {
    this.selectedSubject = null;
  }

  defineSchedule(subjectId: number): void {
    this.loadHorarios(subjectId);
  }

  cancel(): void {
    this.router.navigate(["/student/asignaturas"]);
  }


}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { CourseInstancia } from '../../../models/course-instancia';
import { HorarioCourse } from '../../../models/horario-course';
import { CursosExtensionService } from '../../../services/cursos-extension.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';
import { StudentService } from '../../../services/student.service';
interface inscripcion {
  studentId: number;
  extensionCourseInstanceId: number;
  enrollmentDate: string; // Date
}
@Component({
  selector: 'app-inscribir-curso',
  imports: [CommonModule,FormsModule],
  templateUrl: './inscribir-curso.component.html',
  styleUrl: './inscribir-curso.component.css'
})
export class InscribirCursoComponent implements OnInit {
  subjects: CourseInstancia[] = []
  filteredSubjects: CourseInstancia[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Course[] = []
  teachersMap: { [id: number]: string } = {};
  isEditing: any
  horarios: HorarioCourse[] = [];

  constructor(
    private materiasService: CursosExtensionService,
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
        const filtered = allSubjects.filter(i => i.extensionCourseId === this.materiaId);

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
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.startDate.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.publicationStatus.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  inscribirse(instId: number): void {
    this.studentService.getId().subscribe({
      next: (studentId) => {
        // Obtener inscripciones del estudiante
        this.materiasService.getEnrollmentMAteriasByStudentId(studentId).subscribe({
          next: (enrollments) => {
            const inscripcionExistente = enrollments.find(e => e.extensionCourseInstanceId === instId);

            if (inscripcionExistente) {
              if (inscripcionExistente.status === 'Enrolled') {
                alert('Ya estás inscrito en esta materia.');
                return;
              }

              const updatedInscripcion = {
                ...inscripcionExistente,
                status: 'Enrolled'
              };

              this.studentService.cancelarCourse(inscripcionExistente.id, updatedInscripcion).subscribe({
                next: () => {
                  alert('Inscripción reactivada correctamente.');
                  this.router.navigate(['/student/cursos']);
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
                extensionCourseInstanceId: instId,
                enrollmentDate: fechaUTC.toISOString()
              };

              this.studentService.enrollmentStudentInCourse(inscripcionData).subscribe({
                next: (id) => {
                  if (id) {
                  this.studentService.ingresaANotasCourse(id).subscribe({
                    next: () => {
                      console.log('Notas ingresadas correctamente para la inscripción:', id);
                    },
                    error: (error) => {
                      console.error('Error ingresando notas:', error);
                      alert('Error al ingresar notas para la inscripción.');
                    }
                  });  
                  alert('Inscripción exitosa en el curso.');
                  this.router.navigate(['/student/cursos']);
                  }
                },
                error: (error) => {
                  console.error('Error al inscribirse:', error);
                  alert('Error al inscribirse en el curso.');
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
  selectedSubject: HorarioCourse[] | null = null;

  showInfoModal(subject: HorarioCourse[]): void {
    this.selectedSubject = subject;
  }

  closeModal(): void {
    this.selectedSubject = null;
  }

  defineSchedule(subjectId: number): void {
    this.loadHorarios(subjectId);
  }

  cancel(): void {
    this.router.navigate(["/student/cursos"]);
  }


}

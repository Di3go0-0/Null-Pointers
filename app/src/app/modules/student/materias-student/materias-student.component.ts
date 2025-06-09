import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { MateriasService } from "../../../services/materias.service"
import { Materia } from "../../../models/materia"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { StudentService } from "../../../services/student.service"
import { EnrollmentCourse } from "../../../models/enrollment-course"

@Component({
  selector: 'app-materias-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './materias-student.component.html',
  styleUrl: './materias-student.component.css'
})
export class MateriasStudentComponent implements OnInit {
  subjects: Materia[] = []
  filteredSubjects: Materia[] = []
  searchTerm = ""
  isLoading = false
  programasMap: { [id: number]: string } = {};
  studentId!: number;
  CancelarMateria: EnrollmentCourse | null = null; // Para cancelar una materia
  statusCancel = 'Dropped';
  inscripcionesMap: { [courseId: number]: boolean } = {}; // true si ya está inscrito

  constructor(
    private materiasService: MateriasService,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.studentService.getId().subscribe({
      next: (id) => {
        this.studentId = id;
        this.studentService.getEnrollmentProgramByIdStudent(id).subscribe({
          next: (programs) => {
            const program = programs.find(p => p.status === 'Enrolled');
            if (!program) {
              console.error("No enrolled program found for student ID:", id);
              return;
            }

            this.programasMap[program.academicProgramId] = program.academicProgramName;

            this.studentService.getMateriasByProgramId(program?.academicProgramId).subscribe({
              next: (materias) => {
                this.subjects = materias;
                this.filteredSubjects = materias;
                this.loadEnrollments();
                this.isLoading = false;
              },
              error: (error) => {
                console.error("Error obteniendo materias por ID de programa:", error);
              }
            });

          }
        });
      },
      error: (error) => {
        console.error("Error obteniendo el ID del estudiante:", error);
      }
    });
  }

  loadEnrollments(): void {
    this.materiasService.getEnrollmentMAteriasByStudentId(this.studentId).subscribe({
      next: (enrollments) => {
        this.materiasService.getAllInstancias().subscribe({
          next: (instancias) => {
            for (const subject of this.subjects) {
              const instanciasDeMateria = instancias.filter(i => i.courseId === subject.id);
              const estaInscrito = enrollments.some(e =>
                e.status === 'Enrolled' &&
                instanciasDeMateria.some(i => i.id === e.courseInstanceId)
              );
              this.inscripcionesMap[subject.id] = estaInscrito;
            }
          },
          error: (e) => {
            console.error("Error obteniendo instancias:", e);
          }
        });
      },
      error: (err) => {
        console.error("Error obteniendo inscripciones:", err);
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSubjects = this.subjects
      return
    }

    this.filteredSubjects = this.subjects.filter(
      (subject) =>
        subject.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
        || subject.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  inscribirse(id: number): void {
    this.router.navigate(["/student/asignaturas/inscribir", id])
  }

  cancelar(courseId: number): void {
  this.materiasService.getEnrollmentMAteriasByStudentId(this.studentId).subscribe({
    next: (enrollments) => {
      this.materiasService.getAllInstancias().subscribe({
        next: (instancias) => {
          const instanciasDeMateria = instancias.filter(i => i.courseId === courseId);

          // Encontrar la inscripción activa ('Enrolled') para esa instancia
          const inscripcion = enrollments.find(e =>
            e.status === 'Enrolled' &&
            instanciasDeMateria.some(i => i.id === e.courseInstanceId)
          );

          if (!inscripcion) {
            console.error('No se encontró una inscripción activa para cancelar.');
            return;
          }

          const updatedEnrollment: EnrollmentCourse = {
            ...inscripcion,
            status: 'Dropped'
          };

          this.studentService.cancelarMateria(inscripcion.id, updatedEnrollment).subscribe({
            next: () => {
              alert('Inscripción cancelada con éxito.');
              console.log('Inscripción cancelada con éxito.');
              this.loadEnrollments(); // refresca los botones
            },
            error: (e) => {
              alert('Error al cancelar la inscripción. Por favor, inténtelo de nuevo más tarde.');
              console.error('Error cancelando la materia:', e);
            }
          });
        },
        error: (e) => {
          console.error('Error obteniendo instancias:', e);
        }
      });
    },
    error: (e) => {
      console.error('Error obteniendo inscripciones:', e);
    }
  });
}




  selectedSubject: Materia | null = null;

  showInfoModal(subject: Materia): void {
    this.selectedSubject = subject;
  }

  closeModal(): void {
    this.selectedSubject = null;
  }

}

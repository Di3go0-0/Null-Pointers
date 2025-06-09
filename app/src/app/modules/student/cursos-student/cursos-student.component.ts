import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { EnrollmentCourseEx } from '../../../models/enrollment-course-ex';
import { CursosExtensionService } from '../../../services/cursos-extension.service';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-student',
  imports: [CommonModule,FormsModule],
  templateUrl: './cursos-student.component.html',
  styleUrl: './cursos-student.component.css'
})
export class CursosStudentComponent implements OnInit {
  subjects: Course[] = []
  filteredSubjects: Course[] = []
  searchTerm = ""
  isLoading = false
  programasMap: { [id: number]: string } = {};
  studentId!: number;
  CancelarMateria: EnrollmentCourseEx | null = null; // Para cancelar una materia
  statusCancel = 'Cancelled';
  inscripcionesMap: { [courseId: number]: boolean } = {}; // true si ya está inscrito

  constructor(
    private materiasService: CursosExtensionService,
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

            this.studentService.getCoursesByProgramId(program?.academicProgramId).subscribe({
              next: (materias) => {
                this.subjects = materias;
                this.filteredSubjects = materias;
                this.loadEnrollments();
                this.isLoading = false;
              },
              error: (error) => {
                console.error("Error obteniendo cursos por ID de programa:", error);
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
              const instanciasDeMateria = instancias.filter(i => i.extensionCourseId === subject.id);
              const estaInscrito = enrollments.some(e =>
                e.status === 'Enrolled' &&
                instanciasDeMateria.some(i => i.id === e.extensionCourseInstanceId)
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
    this.router.navigate(["/student/cursos/inscribir", id])
  }

  cancelar(courseId: number): void {
  this.materiasService.getEnrollmentMAteriasByStudentId(this.studentId).subscribe({
    next: (enrollments) => {
      this.materiasService.getAllInstancias().subscribe({
        next: (instancias) => {
          const instanciasDeMateria = instancias.filter(i => i.extensionCourseId === courseId);

          // Encontrar la inscripción activa ('Enrolled') para esa instancia
          const inscripcion = enrollments.find(e =>
            e.status === 'Enrolled' &&
            instanciasDeMateria.some(i => i.id === e.extensionCourseInstanceId)
          );

          if (!inscripcion) {
            console.error('No se encontró una inscripción activa para cancelar.');
            return;
          }

          const updatedEnrollment: EnrollmentCourseEx = {
            ...inscripcion,
            status: 'Cancelled'
          };

          this.studentService.cancelarCourse(inscripcion.id, updatedEnrollment).subscribe({
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




  selectedSubject: Course | null = null;

  showInfoModal(subject: Course): void {
    this.selectedSubject = subject;
  }

  closeModal(): void {
    this.selectedSubject = null;
  }

}
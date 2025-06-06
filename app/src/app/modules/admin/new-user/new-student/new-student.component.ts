import { Component } from '@angular/core';
import { PersonalInfo } from '../../../../models/personal-info';
import { ParentsInfo } from '../../../../models/parents-info';
import { EnrollmentsPrograms } from '../../../../models/enrollments-programs';
import { Student } from '../../../../models/student';
import { Programa } from '../../../../models/programa';
import { StudentService } from '../../../../services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {student: Student = new Student('', '', '', '');
  personalInfo: PersonalInfo = new PersonalInfo('', new Date(), '', '');
  parentsInfo: ParentsInfo = new ParentsInfo(0, '', '', '');
  enrollmentProgram: EnrollmentsPrograms = new EnrollmentsPrograms(0, 0, new Date());

  programs: Programa[] = [];
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.getPrograms().subscribe({
      next: data => this.programs = data,
      error: err => console.error('Error cargando programas', err)
    });
  }

  onSubmit(): void {
    if (!this.student.name || !this.student.email || !this.student.password || !this.student.confirmPassword) {
      alert('Todos los campos del estudiante son obligatorios');
      return;
    }

    this.isLoading = true;

    this.studentService.createStudent(this.student).subscribe({
      next: studentId => {
        this.studentService.createPersonalInfo(studentId, this.personalInfo).subscribe();
        this.studentService.createParentsInfo(studentId, this.parentsInfo).subscribe();
        this.enrollmentProgram.studentId = studentId;

        this.studentService.registrarEstudiantePrograma(this.enrollmentProgram).subscribe({
          next: () => {
            alert('Estudiante registrado correctamente');
            this.router.navigate(['/admin/estudiantes']);
          },
          error: () => {
            alert('Error registrando la inscripción');
            this.isLoading = false;
          }
        });
      },
      error: () => {
        alert('Error creando estudiante');
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }


}

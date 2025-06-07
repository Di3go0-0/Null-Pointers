import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { TeacherService } from '../../../../services/profesores.service';
import { Student } from '../../../../models/student';
import { TeacherCreate } from '../../../../models/teacher-create';
import { PersonalInfo } from '../../../../models/personal-info';
import { ParentsInfo } from '../../../../models/parents-info';
import { EnrollmentsPrograms } from '../../../../models/enrollments-programs';
import { Programa } from '../../../../models/programa';
import { TipoContrato } from '../../../../models/tipo-contrato';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentInfo } from '../../../../models/student-info';
import { Teacher } from '../../../../models/teacher';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  tipoUsuario: 'student' | 'teacher' = 'student';
  idUsuario!: number;
  

  // Datos comunes y específicos
  isLoading = false;
  personalInfo = new PersonalInfo('', new Date(), '', '');
  student: StudentInfo = new StudentInfo(0,"","");
  teacher: Teacher = new Teacher(0,"","","","","",0);
  parentsInfo = new ParentsInfo(0, '', '', '');
  enrollmentProgram = new EnrollmentsPrograms(0, 0, new Date());

  programs: Programa[] = [];
  tiposContrato: TipoContrato[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.tipoUsuario = this.route.snapshot.paramMap.get('tipo') as 'student' | 'teacher';
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));

    if (this.tipoUsuario === 'teacher') {
      this.loadTeacher();
    } else {
      this.loadStudent();
    }
  }

  loadTeacher(): void {
    this.teacherService.getTeacherById(this.idUsuario).subscribe(data => this.teacher = data);
    this.teacherService.getPersonalInfo(this.idUsuario).subscribe(info => this.personalInfo = info);
    this.teacherService.getTypesOfContract().subscribe(tipos => this.tiposContrato = tipos);
  }

  loadStudent(): void {
    this.studentService.getStudentById(this.idUsuario).subscribe(data => this.student = data);
    this.studentService.getPersonalInfo(this.idUsuario).subscribe(info => this.personalInfo = info);
    this.studentService.getParentsInfo(this.idUsuario).subscribe(info => this.parentsInfo = info);
    this.studentService.getEnrollmentByStudent(this.idUsuario).subscribe(info => this.enrollmentProgram = info);
    this.studentService.getPrograms().subscribe(data => this.programs = data);
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.tipoUsuario === 'teacher') {
      this.teacherService.updateTeacher(this.idUsuario, this.teacher).subscribe(() => {
        this.teacherService.updatePersonalInfo(this.idUsuario, this.personalInfo).subscribe(() => {
          alert('Docente actualizado');
          this.router.navigate(['/admin/docentes']);
        });
      });
    } else {
      this.studentService.updateStudent(this.idUsuario, this.student).subscribe(() => {
        this.studentService.updatePersonalInfo(this.idUsuario, this.personalInfo).subscribe();
        this.studentService.updateParentsInfo(this.idUsuario, this.parentsInfo).subscribe();
        this.studentService.updateEnrollment(this.enrollmentProgram).subscribe(() => {
          alert('Estudiante actualizado');
          this.router.navigate(['/admin/estudiantes']);
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }

}

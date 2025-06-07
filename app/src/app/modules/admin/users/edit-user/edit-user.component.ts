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
import { ProgramaRegistrado } from '../../../../models/programa-registrado';
interface TeacherUpdate {
  contractTypeId: number;
  specialty: string;
  experience: string;
  baseSalary: number;
  name: string;
  email: string;
}
interface programaUpdate {
  academicProgramId: number;
  studentId: number;
  enrollmentDate: Date;
  status: string;
}

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
  student: StudentInfo = new StudentInfo(0, "", "");
  teacher: Teacher = new Teacher(0, "", "", "", "", "", 0);
  parentsInfo = new ParentsInfo(0, '', '', '');
  enrollmentProgram = new ProgramaRegistrado(0, 0, '', 0, '', new Date(), '');
  teacherCreate: TeacherCreate = new TeacherCreate('', '', '', '', 0, '', '', 0);
  programs: Programa[] = [];
  tiposContrato: TipoContrato[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  getIdContracttype(ContracName: string): number {
    const tipoContrato = this.tiposContrato.find(tipo => tipo.typeName === ContracName);
    return tipoContrato ? tipoContrato.id : 0;
  }

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
  this.teacherService.getTeacherById(this.idUsuario).subscribe({
    next: data => this.teacher = data[0],
    error: err => {
      alert('Error al cargar el docente');
      console.error(err);
    }
  });

  this.teacherService.getPersonalInfo(this.idUsuario).subscribe({
    next: info => this.personalInfo = info[0],
    error: err => {
      alert('Error al cargar la información personal del docente');
      console.error(err);
    }
  });

  this.teacherService.getTypesOfContract().subscribe({
    next: tipos => this.tiposContrato = tipos,
    error: err => {
      alert('Error al cargar los tipos de contrato');
      console.error(err);
    }
  });
}

loadStudent(): void {
  this.studentService.getStudentById(this.idUsuario).subscribe({
    next: data => this.student = data[0],
    error: err => {
      alert('Error al cargar el estudiante');
      console.error(err);
    }
  });

  this.studentService.getPersonalInfo(this.idUsuario).subscribe({
    next: info => this.personalInfo = info[0],
    error: err => {
      alert('Error al cargar la información personal del estudiante');
      console.error(err);
    }
  });

  this.studentService.getParentsInfo(this.idUsuario).subscribe({
    next: info => this.parentsInfo = info[0],
    error: err => {
      alert('Error al cargar la información de acudientes');
      console.error(err);
    }
  });

  this.studentService.getEnrollmentByStudent(this.idUsuario).subscribe({
    next: info => this.enrollmentProgram = info[0],
    error: err => {
      alert('Error al cargar la matrícula del estudiante');
      console.error(err);
    }
  });

  this.studentService.getPrograms().subscribe({
    next: data => this.programs = data,
    error: err => {
      alert('Error al cargar los programas académicos');
      console.error(err);
    }
  });
}

onSubmit(): void {
  this.isLoading = true;

  if (this.tipoUsuario === 'teacher') {
    const teacherUpdate: TeacherUpdate = {
      contractTypeId: this.getIdContracttype(this.teacher.contractName),
      specialty: this.teacher.specialty,
      experience: this.teacher.experience,
      baseSalary: this.teacher.baseSalary,
      name: this.teacher.name,
      email: this.teacher.email
    };

    this.teacherService.updateTeacher(this.idUsuario, teacherUpdate).subscribe({
      next: () => {
        this.teacherService.updatePersonalInfo(this.idUsuario, this.personalInfo).subscribe({
          next: () => {
            alert('Docente actualizado');
            this.router.navigate(['/admin/users']);
          },
          error: err => {
            alert('Error al actualizar la información personal del docente');
            console.error(err);
          }
        });
      },
      error: err => {
        alert('Error al actualizar los datos del docente');
        console.error(err);
      }
    });

  } else {
    this.studentService.updateStudent(this.idUsuario, this.student).subscribe({
      next: () => {
        this.studentService.updatePersonalInfo(this.idUsuario, this.personalInfo).subscribe({
          error: err => {
            alert('Error al actualizar la información personal del estudiante');
            console.error(err);
          }
        });

        this.studentService.updateParentsInfo(this.idUsuario,this.parentsInfo.id, this.parentsInfo).subscribe({
          error: err => {
            alert('Error al actualizar la información de acudientes');
            console.error(err);
          }
        });
        const programaActualizado: programaUpdate = {
          academicProgramId: this.enrollmentProgram.academicProgramId,
          studentId: this.idUsuario,
          enrollmentDate: this.enrollmentProgram.enrollmentDate,
          status: this.enrollmentProgram.status
        };

        this.studentService.updateEnrollment(this.enrollmentProgram.id, programaActualizado).subscribe({
          next: () => {
            alert('Estudiante actualizado');
            this.router.navigate(['/admin/users']);
          },
          error: err => {
            alert('Error al actualizar la matrícula del estudiante');
            console.error(err);
          }
        });
      },
      error: err => {
        alert('Error al actualizar los datos del estudiante');
        console.error(err);
      }
    });
  }
}


  cancel(): void {
    this.router.navigate(['/admin/users']);
  }

}

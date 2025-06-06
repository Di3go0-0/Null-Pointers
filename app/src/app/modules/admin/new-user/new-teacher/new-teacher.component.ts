import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherCreate } from '../../../../models/teacher-create';
import { PersonalInfo } from '../../../../models/personal-info';
import { TipoContrato } from '../../../../models/tipo-contrato';
import { TeacherService } from '../../../../services/profesores.service';


@Component({
  selector: 'app-new-teacher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-teacher.component.html',
  styleUrl: './new-teacher.component.css'
})
export class NewTeacherComponent implements OnInit {
  isLoading = false;

  teacher: TeacherCreate = new TeacherCreate('', '', '', '', 0, '', '', 0);
  personalInfo: PersonalInfo = new PersonalInfo('', new Date, '', '');
  tiposContrato: TipoContrato[] = [];

  constructor(
    private router: Router,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherService.getTypesOfContract().subscribe({
      next: (tipos) => this.tiposContrato = tipos,
      error: (err) => console.error("Error al cargar tipos de contrato", err)
    });
  }

  onSubmit(): void {
    if (
      !this.teacher.name || !this.teacher.email || !this.teacher.password || !this.teacher.confirmPassword ||
      !this.teacher.contractTypeId || !this.teacher.specialty || !this.teacher.experience || !this.teacher.baseSalary
    ) {
      alert('Por favor complete todos los campos obligatorios de información profesional.');
      return;
    }

    if (this.teacher.password !== this.teacher.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (
      !this.personalInfo.identificationNumber || !this.personalInfo.birthdate ||
      !this.personalInfo.address || !this.personalInfo.phoneNumber
    ) {
      alert('Por favor complete todos los campos obligatorios de información personal.');
      return;
    }

    this.isLoading = true;

    this.teacherService.createTeacher(this.teacher).subscribe({
      next: (res) => {
        const teacherId = res;
        this.teacherService.createPersonalInfo(teacherId, this.personalInfo).subscribe({
          next: () => {
            alert('Docente registrado exitosamente.');
            this.router.navigate(['/admin']);
          },
          error: (err) => {
            console.error("Error al guardar información personal:", err);
            alert("Docente creado, pero hubo un error guardando la información personal.");
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error("Error al crear docente:", err);
        alert("Error al registrar el docente.");
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}

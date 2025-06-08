import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-horario-student',
  imports: [CommonModule],
  templateUrl: './horario-student.component.html',
  styleUrl: './horario-student.component.css'
})
export class HorarioStudentComponent implements OnInit {
  tipo: 'student' | 'teacher' = 'student';
  id!: number;
  cursosNormales: any[] = [];
  cursosExtension: any[] = [];
  public sinHorario: boolean = false;
  public horarioExtension: boolean = false;
  diasTraducidos: { [key: string]: string } = {
    'Monday': 'Lunes',
    'Tuesday': 'Martes',
    'Wednesday': 'Miércoles',
    'Thursday': 'Jueves',
    'Friday': 'Viernes',
    'Saturday': 'Sábado',
    'Sunday': 'Domingo'
  };
isLoading: boolean = true;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
  this.studentService.getId().subscribe(id => {
    this.isLoading = true
    this.id = id;
    console.log('ID del estudiante:', this.id);
    this.loadStudentSchedule(); // ← ahora sí con el `id` definido
  });
}
  
  

  async loadStudentSchedule(): Promise<void> {
    const enrollmentCourses = await this.studentService.getEnrollmentCourses(this.id).toPromise();
    for (const enrollment of enrollmentCourses || []) {
      const instanceId = enrollment.courseInstanceId;
      const horario = await this.studentService.getHorarioByInstanceId(instanceId).toPromise();
      if (!horario || horario.length === 0) continue;

      const instance = await this.studentService.getCourseInstancesActiveByStudent(instanceId).toPromise();
      if (!instance || instance.length === 0) continue;

      const inst = instance[0];
      const materiaResponse = await this.studentService.getMateriaById(inst.courseId).toPromise();
      if (!materiaResponse || materiaResponse.length === 0) continue;

      const materia = materiaResponse[0];

      this.cursosNormales.push({
        nombre: materia.courseName,
        codigo: materia.courseCode,
        grupo: inst.groupCode,
        horario: horario.map(h => ({
          day: this.diasTraducidos[h.day] || h.day,
          time: `${h.startTime} - ${h.endTime}`,
          classroom: h.classroom
        }))
      });
    }

    const extensionEnrollments = await this.studentService.getEnrollmentCoursesEx(this.id).toPromise();

    for (const enrollment of extensionEnrollments || []) {
      if (enrollment.status === 'Enrolled') {
        console.log('entre a cursos matriculados de extension')
        console.log('Enrollment extensión:', enrollment);
        const instanceIdEx = enrollment.extensionCourseInstanceId;
        const horarioEx = await this.studentService.getHorarioByInstanceIdEx(instanceIdEx).toPromise();
        if (!horarioEx || horarioEx.length === 0) continue;

        const instanceEx = await this.studentService.getCourseInstancesActiveByStudentEx(instanceIdEx).toPromise();
        if (!instanceEx || instanceEx.length === 0) continue;

        const inst = instanceEx[0];
        const materiaResponseEx = await this.studentService.getMateriaByIdEx(inst.extensionCourseId).toPromise();
        if (!materiaResponseEx || materiaResponseEx.length === 0) continue;

        const materiaEx = materiaResponseEx[0];

        this.cursosExtension.push({
          nombre: materiaEx.courseName,
          codigo: materiaEx.courseCode,
          grupo: inst.groupCode,
          horario: horarioEx.map(h => ({
            day: this.diasTraducidos[h.day] || h.day,
            time: `${h.startTime} - ${h.endTime}`,
            classroom: h.classroom
          }))
        });
      }

    }

    this.sinHorario = this.cursosNormales.length === 0 && this.cursosExtension.length === 0;
    this.horarioExtension = this.cursosExtension.length > 0;
    this.isLoading = false
  }

  back(): void {
    this.router.navigate(['/teacher']);
  }
}
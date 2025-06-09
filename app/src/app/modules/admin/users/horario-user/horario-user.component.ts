import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { TeacherService } from '../../../../services/profesores.service';


@Component({
  selector: 'app-horario-user',
  imports: [CommonModule],
  templateUrl: './horario-user.component.html',
  styleUrl: './horario-user.component.css'
})
export class HorarioUserComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') as 'student' | 'teacher';
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.tipo === 'student') {
      this.loadStudentSchedule();
    } else {
      this.loadTeacherSchedule();
    }
  }

  async loadStudentSchedule(): Promise<void> {
    const enrollmentCourses = await this.studentService.getEnrollmentCourses(this.id).toPromise();
    for (const enrollment of enrollmentCourses || []) {
      if (enrollment.status !== 'Enrolled') continue;  // 👈 Solo continúa si está inscrito
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
  }

  async loadTeacherSchedule(): Promise<void> {
    const instances = await this.teacherService.getCourseInstancesActiveByTeacher(this.id).toPromise();
    for (const inst of instances || []) {
      const materiaResponse = await this.teacherService.getMateriaById(inst.courseId).toPromise();
      if (!materiaResponse || materiaResponse.length === 0) continue;

      const materia = materiaResponse[0];
      const horario = await this.teacherService.getHorarioByInstanceId(inst.id).toPromise();
      if (!horario || horario.length === 0) continue;

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

    const extensionInstances = await this.teacherService.getCourseInstancesActiveByTeacherExtension(this.id).toPromise();
    for (const inst of extensionInstances || []) {
      const materiaResponse = await this.teacherService.getMateriaByIdExtension(inst.extensionCourseId).toPromise();
      if (!materiaResponse || materiaResponse.length === 0) continue;

      const materia = materiaResponse[0];
      const horario = await this.teacherService.getHorarioByInstanceIdExtension(inst.id).toPromise();
      if (!horario || horario.length === 0) continue;

      this.cursosExtension.push({
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

    this.sinHorario = this.cursosNormales.length === 0 && this.cursosExtension.length === 0;
    this.horarioExtension = this.cursosExtension.length > 0;
  }

  back(): void {
    this.router.navigate(['/admin/users']);
  }
}
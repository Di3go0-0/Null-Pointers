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
  cursos: any[] = [];
  public sinHorario: boolean = false;
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
    if (!enrollmentCourses || enrollmentCourses.length === 0) {
      this.sinHorario = true;  
      return;
    }

    for (const enrollment of enrollmentCourses) {
      const instanceId = enrollment.courseInstanceId;
      const horario = await this.studentService.getHorarioByInstanceId(instanceId).toPromise();
      if (!horario || horario.length === 0) continue;

      const instance = await this.studentService.getCourseInstancesActiveByStudent(instanceId).toPromise();
      if (!instance || instance.length === 0) continue;

      const inst = instance[0];
      const materiaResponse = await this.studentService.getMateriaById(inst.courseId).toPromise();
      if (!materiaResponse || materiaResponse.length === 0) continue;

      const materia = materiaResponse[0];

      this.cursos.push({
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
  }

  async loadTeacherSchedule(): Promise<void> {
    const instances = await this.teacherService.getCourseInstancesActiveByTeacher(this.id).toPromise();
    if (!instances || instances.length === 0) {
      this.sinHorario = true;  
      return;
    }

    for (const inst of instances) {
      const materiaResponse = await this.teacherService.getMateriaById(inst.courseId).toPromise();
      if (!materiaResponse || materiaResponse.length === 0) continue;

      const materia = materiaResponse[0];
      const horario = await this.teacherService.getHorarioByInstanceId(inst.id).toPromise();
      if (!horario || horario.length === 0) continue;

      this.cursos.push({
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
  }

  back(): void {
    this.router.navigate(['/admin/users']);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';

@Component({
  selector: 'app-horario-teacer',
  imports: [CommonModule],
  templateUrl: './horario-teacer.component.html',
  styleUrl: './horario-teacer.component.css'
})
export class HorarioTeacerComponent implements OnInit {
  tipo: 'student' | 'teacher' = 'teacher';
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
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
  this.teacherService.getId().subscribe(id => {
    this.isLoading = true
    this.id = id;
    console.log('ID del profesor:', this.id);
    this.loadTeacherSchedule(); // ← ahora sí con el `id` definido
  });
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
      this.isLoading = false;
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
    this.router.navigate(['/teacher']);
  }
}
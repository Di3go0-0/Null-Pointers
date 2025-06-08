import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { ApiService } from './solicitudes.service';
import { TeacherCreate } from '../models/teacher-create';
import { TipoContrato } from '../models/tipo-contrato';
import { MateriaInstanciada } from '../models/materia-instanciada';
import { HorarioMateria } from '../models/horario-materia';
import { Materia } from '../models/materia';
import { CourseInstancia } from '../models/course-instancia';
import { HorarioCourse } from '../models/horario-course';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene la lista de profesores
   */
  getAllTeachers(): Observable<Teacher[]> {
    return this.apiService.get<Teacher[]>('/teachers');
  }
  /**
   * Crear un nuevo profesor
   * @param teacherData Datos del nuevo profesor
   * @returns ID del nuevo profesor
   */
  createTeacher(teacher: TeacherCreate): Observable<number> {
    return this.apiService.post<number>('/teachers', teacher);
  }
  createPersonalInfo(teacherId: number, personalInfo: any): Observable<any> {
    return this.apiService.post<any>(`/personal-info/${teacherId}`, personalInfo);
  }
  getTypesOfContract(): Observable<TipoContrato[]> {
    return this.apiService.get<TipoContrato[]>('/contracts-type');
  }

  /**
   * Obtiene un profesor por su ID
   * @param id ID del profesor
   * @returns Datos del profesor
   */
  getTeacherById(id: number): Observable<Teacher[]> {
    return this.apiService.get<Teacher[]>(`/teachers/${id}`);
  }
  getPersonalInfo(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`/personal-info/${id}`);
  }
  updateTeacher(id: number, teacher: any): Observable<Teacher> {
    return this.apiService.patch<Teacher>(`/teachers/${id}`, teacher);
  }

  updatePersonalInfo(id: number, personalInfo: any): Observable<any> {
    return this.apiService.patch<any>(`/personal-info/${id}`, personalInfo);
  }
  /**
   * Obtiene las asignaturas que imparte un profesor activas
   * @param id ID del profesor
   * @returns Lista de asignaturas
   */
  getCourseInstancesActiveByTeacher(id: number): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>(`/courses-instances/search?teacherId=${id}&status=Active`);  
  }

  getHorarioByInstanceId(id: number): Observable<HorarioMateria[]> {
    return this.apiService.get<HorarioMateria[]>(`/schedules-courses-instances/search?courseInstanceId=${id}`); 
  }

  getMateriaById(id: number): Observable<Materia[]> {
    return this.apiService.get<Materia[]>(`/courses/${id}`);
  }

  //metodos para obtener el horario de los cursos de extension
  getCourseInstancesActiveByTeacherExtension(id: number): Observable<CourseInstancia[]> {
    return this.apiService.get<CourseInstancia[]>(`/extesnion-courses-instances/search?teacherId=${id}&publicationStatus=Published`);
  }
  getHorarioByInstanceIdExtension(id: number): Observable<HorarioCourse[]> {
    return this.apiService.get<HorarioCourse[]>(`/schedules-extension-instances/search?extensionCourseInstanceId=${id}`);
  }
  getMateriaByIdExtension(id: number): Observable<Course[]> {
    return this.apiService.get<Course[]>(`/extension-courses/${id}`);
  }

  getId(): Observable<number> {
    return this.apiService.get<number>('/auth/user-id');
  }
}


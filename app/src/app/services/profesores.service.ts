import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { ApiService } from './solicitudes.service';
import { TeacherCreate } from '../models/teacher-create';
import { TipoContrato } from '../models/tipo-contrato';

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
  getTeacherById(id: number): Observable<Teacher> {
    return this.apiService.get<Teacher>(`/teachers/${id}`);
  }
  getPersonalInfo(id: number): Observable<any> {
    return this.apiService.get<any>(`/personal-info/${id}`);
  }
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.apiService.patch<Teacher>(`/teachers/${id}`, teacher);
  }

  updatePersonalInfo(id: number, personalInfo: any): Observable<any> {
    return this.apiService.patch<any>(`/personal-info/${id}`, personalInfo);
  }
}


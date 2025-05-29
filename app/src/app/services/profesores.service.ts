import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { ApiService } from './solicitudes.service';

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
  createTeacher(teacherData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    contractTypeId: number;
    specialty: string;
    experience: string;
    baseSalary: number;
  }): Observable<{ id: number }> {
    return this.apiService.post<{ id: number }>('/teachers', teacherData);
  }
}


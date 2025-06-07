import { Injectable } from '@angular/core';
import { ApiService } from './solicitudes.service';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa';
import { Student } from '../models/student';
import { PersonalInfo } from '../models/personal-info';
import { ParentsInfo } from '../models/parents-info';
import { EnrollmentsPrograms } from '../models/enrollments-programs';
import { StudentInfo } from '../models/student-info';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: ApiService) { }

  getPrograms():Observable<Programa[]> {
    return this.apiService.get<Programa[]>('/academic-programs');
  }

  createStudent(student: Student): Observable<number> {
    return this.apiService.post<number>('/students', student);
  }

  createPersonalInfo(studentId: number, personalInfo: PersonalInfo): Observable<any> {
    return this.apiService.post<any>(`/personal-info/${studentId}`, personalInfo);
  }

  createParentsInfo(studentId: number, parentsInfo: ParentsInfo): Observable<number> {
    return this.apiService.post<number>(`/parents-info/${studentId}`, parentsInfo);
  }

  registrarEstudiantePrograma(enrollmentProgram: EnrollmentsPrograms): Observable<number>{
    return this.apiService.post<number>('/enrollments-programs', enrollmentProgram);
  }
  getstudents(): Observable<StudentInfo[]> {
    return this.apiService.get<StudentInfo[]>('/students');
  }
  getPersonalInfo(id: number): Observable<any> {
    return this.apiService.get<any>(`/personal-info/${id}`);
  }
  getParentsInfo(id: number): Observable<any> {
    return this.apiService.get<any>(`/parents-info/${id}`);
  }
  getStudentById(id: number): Observable<StudentInfo> {
    return this.apiService.get<StudentInfo>(`/students/${id}`);
  }

  getEnrollmentByStudent(id: number): Observable<any> {
    return this.apiService.get<any>(`/enrollments-programs/search?studentId=${id}`);
  }

  updateStudent(id: number, student: any): Observable<number> {
    return this.apiService.patch<number>(`/students/${id}`, student);
  }

  updatePersonalInfo(id: number, personalInfo: PersonalInfo): Observable<any> {
    return this.apiService.patch<any>(`/personal-info/${id}`, personalInfo);
  }

  updateParentsInfo(id: number, parentsInfo: ParentsInfo): Observable<any> {
    return this.apiService.patch<any>(`/parents-info/${id}`, parentsInfo);
  }

  updateEnrollment(id:number , enrollmentProgram: any): Observable<any> {
    return this.apiService.patch<any>(`/enrollments-programs/${id}`, enrollmentProgram);
  }

  
}

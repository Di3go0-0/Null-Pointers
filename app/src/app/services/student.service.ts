import { Injectable } from '@angular/core';
import { ApiService } from './solicitudes.service';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa';
import { Student } from '../models/student';
import { PersonalInfo } from '../models/personal-info';
import { ParentsInfo } from '../models/parents-info';
import { EnrollmentsPrograms } from '../models/enrollments-programs';
import { StudentInfo } from '../models/student-info';
import { EnrollmentCourse } from '../models/enrollment-course';
import { HorarioMateria } from '../models/horario-materia';
import { CourseInstancia } from '../models/course-instancia';
import { Materia } from '../models/materia';
import { MateriaInstanciada } from '../models/materia-instanciada';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: ApiService) { }

  getPrograms(): Observable<Programa[]> {
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

  registrarEstudiantePrograma(enrollmentProgram: EnrollmentsPrograms): Observable<number> {
    return this.apiService.post<number>('/enrollments-programs', enrollmentProgram);
  }
  getstudents(): Observable<StudentInfo[]> {
    return this.apiService.get<StudentInfo[]>('/students');
  }
  getPersonalInfo(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`/personal-info/${id}`);
  }
  getParentsInfo(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`/parents-info/${id}`);
  }
  getStudentById(id: number): Observable<StudentInfo[]> {
    return this.apiService.get<StudentInfo[]>(`/students/${id}`);
  }

  getEnrollmentByStudent(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`/enrollments-programs/search?studentId=${id}`);
  }

  updateStudent(id: number, student: any): Observable<number> {
    return this.apiService.patch<number>(`/students/${id}`, student);
  }

  updatePersonalInfo(id: number, personalInfo: PersonalInfo): Observable<any> {
    return this.apiService.patch<any>(`/personal-info/${id}`, personalInfo);
  }

  updateParentsInfo(id: number, idInfo: number, parentsInfo: ParentsInfo): Observable<any> {
    return this.apiService.patch<any>(`/parents-info/${id}?parentsInfoId=${idInfo}`, parentsInfo);
  }

  updateEnrollment(id: number, enrollmentProgram: any): Observable<any> {
    return this.apiService.patch<any>(`/enrollments-programs/${id}`, enrollmentProgram);
  }

  // metodo para obtener los cursos en los que un estudiante esta inscrito
  getEnrollmentCourses(id: number): Observable<EnrollmentCourse[]> {
    return this.apiService.get<EnrollmentCourse[]>(`/enrollments-courses/search?studentId=${id}`);
  }
  //metodo para obtener el horaio de una instancia por su id
  getHorarioByInstanceId(id: number): Observable<HorarioMateria[]> {
    return this.apiService.get<HorarioMateria[]>(`/schedules-courses-instances/search?courseInstanceId=${id}`);
  }

  // metodo para obtener la instancia por su id
  getCourseInstancesActiveByStudent(id: number): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>(`/courses-instances/search?id=${id}`);
  }
  getMateriaById(id: number): Observable<Materia[]> {
      return this.apiService.get<Materia[]>(`/courses/${id}`);
    }


}

import { Injectable } from '@angular/core';
import { ApiService } from './solicitudes.service';
import { Observable } from 'rxjs';
import { Programa } from '../models/programa';
import { Course } from '../models/course';
import { CourseInstancia } from '../models/course-instancia';
import { HorarioCourse } from '../models/horario-course';
import { NotasCursos } from '../models/notas-cursos';
import { EnrollmentCourseEx } from '../models/enrollment-course-ex';

@Injectable({
  providedIn: 'root'
})
export class CursosExtensionService {
  private endpoint = '/extension-courses';

  constructor(private apiService: ApiService) { }

  /**
   * Fetches all materias from the API.
   * @returns An observable containing an array of Materia objects.
   */
  getAllMaterias(): Observable<Course[]> {
    return this.apiService.get<Course[]>(this.endpoint);
  }
  getMateriaById(id: number): Observable<Course[]> {
    return this.apiService.get<Course[]>(`${this.endpoint}/${id}`);
  }
  /**
   * funcion para saber cual es el programa academico de una materia.
   * @param id el id del programa academico.
   * @returns nos devuelve un observable con la informacionde la materia.
   */
  getProgramNameById(id: number): Observable<Programa> {
    return this.apiService.get<Programa>(`/academic-programs/${id}`);
  }
  /**
   * Funcion para actualizar una materia.
   * @param materia el objeto de tipo Course con la informacion a actualizar.
   * @param id el id de la materia a a actualizar.
   * @returns un observable con la informacion de la materia.
   */

  updateMateria(id: number, materia: Course): Observable<Course> {
    return this.apiService.patch<Course>(`${this.endpoint}/${id}`, materia);
  }

  createMateria(materia: Course): Observable<number> {
    return this.apiService.post<number>(this.endpoint, materia);
  }

  deleteMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`${this.endpoint}/${id}`);
  }

  getAllPrograms(): Observable<Programa[]> {
    return this.apiService.get<Programa[]>('/academic-programs');
  }

  createInstanciaMateria(materia: CourseInstancia): Observable<number> {
    return this.apiService.post<number>('/extesnion-courses-instances', materia);
  }

  getAllInstancias(): Observable<CourseInstancia[]> {
    return this.apiService.get<CourseInstancia[]>('/extesnion-courses-instances');
  }

  updateInstanciaMateria(id: number, materia: CourseInstancia): Observable<number> {
    return this.apiService.patch<number>(`/extesnion-courses-instances/${id}`, materia);
  }
  deleteInstanciaMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`/extesnion-courses-instances/${id}`);
  }
  getHorariosById(id: number): Observable<HorarioCourse[]> {
    return this.apiService.get<HorarioCourse[]>(`/schedules-extension-instances/search?extensionCourseInstanceId=${id}`);
  }
  createHorarioMateria(horario: HorarioCourse): Observable<number> {
    return this.apiService.post<number>('/schedules-extension-instances', horario);
  }
  deleteHorarioMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`/schedules-extension-instances/${id}`);
  }
  /**
 * Obtiene el nombre del curso a partir del id de la instancia.
 * @param instanciaId El id de la instancia de materia.
 * @returns Un observable con el nombre del curso.
 */
  getCourseNameByInstanciaId(instanciaId: number): Observable<string> {
    return new Observable<string>((observer) => {
      this.getAllInstancias().subscribe({
        next: (instancias) => {
          const instancia = instancias.find(i => i.id === instanciaId);
          if (!instancia) {
            observer.error(`No se encontró la instancia con ID ${instanciaId}`);
            return;
          }

          const courseId = instancia.extensionCourseId;
          this.getMateriaById(courseId).subscribe({
            next: (materiaArray) => {
              const materia = materiaArray[0]; // suponiendo que la API devuelve un arreglo con un solo objeto
              if (materia && materia.courseName) {
                observer.next(materia.courseName);
                observer.complete();
              } else {
                observer.error(`No se encontró la materia con ID ${courseId}`);
              }
            },
            error: (err) => observer.error(err)
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }
  getNotasByInstanciaId(instanciaId: number): Observable<NotasCursos[]> {
    return this.apiService.get<NotasCursos[]>(`/grades-extesnion-courses?extensionCourseInstanceId=${instanciaId}`);
  }

  actualizarNotas(notaId: number, notas: NotasCursos): Observable<any> {
    return this.apiService.patch(`/grades-extesnion-courses/${notaId}`, notas);
  }
  //nuevo
  getEnrollmentMAteriasByStudentId(studentId: number): Observable<EnrollmentCourseEx[]> {
    return this.apiService.get<EnrollmentCourseEx[]>(`/enrollments-extension/search?studentId=${studentId}`);
  }
  getInstanciasById(id: number): Observable<CourseInstancia[]> {
    return this.apiService.get<CourseInstancia[]>(`/extesnion-courses-instances/search?extensionCourseId=${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';
import { ApiService } from './solicitudes.service';
import { MateriaCreate } from '../models/materia-create';
import { Programa } from '../models/programa';
import { MateriaInstanciada } from '../models/materia-instanciada';
import { HorarioMateria } from '../models/horario-materia';
import { NotasMaterias } from '../models/notas-materias';
import { EnrollmentCourse } from '../models/enrollment-course';

@Injectable({
  providedIn: "root",
})
export class MateriasService {
  private endpoint = '/courses';

  constructor(private apiService: ApiService) { }

  /**
   * Fetches all materias from the API.
   * @returns An observable containing an array of Materia objects.
   */
  getAllMaterias(): Observable<Materia[]> {
    return this.apiService.get<Materia[]>(this.endpoint);
  }
  getMateriaById(id: number): Observable<Materia[]> {
    return this.apiService.get<Materia[]>(`${this.endpoint}/${id}`);
  }
  /**
   * funcion para saber cual es el programa academico de una materia.
   * @param id el id del programa academico.
   * @returns nos devuelve un observable con la informacionde del programa academico.
   */
  getProgramNameById(id: number): Observable<Programa> {
    return this.apiService.get<Programa>(`/academic-programs/${id}`);
  }
  /**
   * Funcion para actualizar una materia.
   * @param materia el objeto de tipo MateriaCreate con la informacion a actualizar.
   * @param id el id de la materia a a actualizar.
   * @returns un observable con la informacion de la materia.
   */

  updateMateria(id: number, materia: MateriaCreate): Observable<Materia> {
    return this.apiService.patch<Materia>(`${this.endpoint}/${id}`, materia);
  }

  createMateria(materia: MateriaCreate): Observable<number> {
    return this.apiService.post<number>(this.endpoint, materia);
  }

  deleteMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`${this.endpoint}/${id}`);
  }

  getAllPrograms(): Observable<Programa[]> {
    return this.apiService.get<Programa[]>('/academic-programs');
  }

  createInstanciaMateria(materia: MateriaInstanciada): Observable<number> {
    return this.apiService.post<number>('/courses-instances', materia);
  }

  getAllInstancias(): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>('/courses-instances');
  }
  
  updateInstanciaMateria(id: number, materia: MateriaInstanciada): Observable<number> {
    return this.apiService.patch<number>(`/courses-instances/${id}`, materia);
  }
  deleteInstanciaMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`/courses-instances/${id}`);
  }
  getHorariosById(id: number): Observable<HorarioMateria[]> {
    return this.apiService.get<HorarioMateria[]>(`/schedules-courses-instances/search?courseInstanceId=${id}`);
  }
  createHorarioMateria(horario: HorarioMateria): Observable<number> {
    return this.apiService.post<number>('/schedules-courses-instances', horario);
  }
  deleteHorarioMateria(id: number): Observable<number> {
    return this.apiService.delete<number>(`/schedules-courses-instances/${id}`);
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

          const courseId = instancia.courseId;
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

  getNotasByInstanciaId(instanciaId: number): Observable<NotasMaterias[]> {
    return this.apiService.get<NotasMaterias[]>(`/grades-courses?courseInstanceId=${instanciaId}`);
  }

  actualizarNotas(notaId: number, notas: NotasMaterias): Observable<any> {
    return this.apiService.patch(`/grades-courses/${notaId}`, notas);
  }
  
  getEnrollmentMAteriasByStudentId(studentId: number): Observable<EnrollmentCourse[]> {
    return this.apiService.get<EnrollmentCourse[]>(`/enrollments-courses/search?studentId=${studentId}`);
  }
  getInstanciasById(id: number): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>(`/courses-instances/search?courseId=${id}`);
  }
}


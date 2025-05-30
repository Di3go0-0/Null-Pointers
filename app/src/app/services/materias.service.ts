import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';
import { ApiService } from './solicitudes.service';
import { MateriaCreate } from '../models/materia-create';
import { Programa } from '../models/programa';
import { MateriaInstanciada } from '../models/materia-instanciada';

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

  /**
   * funcion para saber cual es el programa academico de una materia.
   * @param id el id del programa academico.
   * @returns nos devuelve un observable con la informacionde la materia.
   */
  getProgramNameById(id: number): Observable<any> {
    return this.apiService.get<any>(`/academic-programs/${id}`);
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

  createInstanciaMateria(materia: MateriaInstanciada): Observable<MateriaInstanciada>{
    return this.apiService.post<MateriaInstanciada>('/course-instances', materia);
  }

  getAllInstancias(): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>('/course-instances');
  }
  getInstanciasById(id: number): Observable<MateriaInstanciada[]> {
    return this.apiService.get<MateriaInstanciada[]>(`/courses-instances/search?id=${id}`);
  }
  updateInstanciaMateria(id: number, materia: MateriaInstanciada): Observable<MateriaInstanciada> {
    return this.apiService.patch<MateriaInstanciada>(`/course-instances/${id}`, materia);
  }
}


import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  private apiUrl = "https://api.example.com/subjects"


  getSubjects(): Observable<any[]> {
    // Simulación de datos - reemplazar con llamada real a la API
    return of([
      {
        id: 1,
        name: "Matemáticas I",
        code: "MAT101",
        semester: "2024-1",
        program: "Sistemas",
        description: "Fundamentos de cálculo y álgebra",
        teacher: "Dr. Juan Pérez",
      },
      {
        id: 2,
        name: "Tecnología II",
        code: "TEC201",
        semester: "2024-1",
        program: "Sistemas",
        description: "Tecnologías avanzadas de desarrollo",
      },
      {
        id: 3,
        name: "Programación Avanzada",
        code: "PRG301",
        semester: "2024-2",
        program: "Sistemas",
        description: "Conceptos avanzados de programación",
        teacher: "Dra. María González",
      },
    ])
  }

  getSubject(id: number): Observable<any> {
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
    return of({
      id,
      name: "Matemáticas I",
      code: "MAT101",
      semester: "2024-1",
      program: "sistemas",
      description: "Fundamentos de cálculo y álgebra",
    })
  }

  createSubject(subject: any): Observable<any> {
    // return this.http.post<any>(this.apiUrl, subject);
    return of({ success: true, id: Date.now() })
  }

  updateSubject(id: number, subject: any): Observable<any> {
    // return this.http.put<any>(`${this.apiUrl}/${id}`, subject);
    return of({ success: true })
  }

  deleteSubject(id: number): Observable<any> {
    // return this.http.delete<any>(`${this.apiUrl}/${id}`);
    return of({ success: true })
  }

  saveSchedule(scheduleData: any): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/schedule`, scheduleData);
    return of({ success: true })
  }
}


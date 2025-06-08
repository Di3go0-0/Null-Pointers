import { Component, OnInit } from '@angular/core';
import { CourseInstancia } from '../../../models/course-instancia';
import { Course } from '../../../models/course';
import { CursosExtensionService } from '../../../services/cursos-extension.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule,FormsModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {
  subjects: CourseInstancia[] = []
  filteredSubjects: CourseInstancia[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Course[] = []
  teachersMap: { [id: number]: string } = {};
  isEditing: any
  teacherId: number = 0;

  constructor(
    private materiasService: CursosExtensionService,
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: TeacherService
  ) { }

  ngOnInit(): void {
    // Cargar datos de la materia si se está editando
    this.profesorService.getId().subscribe(id => {
      this.teacherId = id;
      this.loadSubjects();

    });
  }
  loadMateria(): void {
    this.materiasService.getMateriaById(this.materiaId).subscribe({
      next: (materia) => {
        this.materia = materia
        console.log("Materia loaded:", this.materia);
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading materia:", error)
        this.isLoading = false
      }
    })
  }

  loadSubjects(): void {
    this.isLoading = true;
    this.profesorService.getCourseInstancesActiveByTeacherExtension(this.teacherId).subscribe({
      next: (allSubjects) => {
        // Filtrar solo aquellas instancias que coincidan con el materiaId actual
        const filtered = allSubjects

        this.subjects = filtered;
        this.filteredSubjects = filtered;
        console.log("Subjects loaded:", this.subjects);
        if (this.subjects.length === 0) {
          console.warn("No subjects found for the current teacher.");
          this.isLoading = false;
          return;
        }
        this.profesorService.getMateriaByIdExtension(allSubjects[0].extensionCourseId).subscribe(materiaResponse => {
          if (!materiaResponse || materiaResponse.length === 0) {
            console.error("Materia not found for courseId:", allSubjects[0].extensionCourseId);
            this.isLoading = false;
            return;
          }
          this.materia = materiaResponse;
        })
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading subjects:", error);
        this.isLoading = false;
      },
    });
  }
  obtenerProgramaNombre(programaId: number) {
    this.materiasService.getProgramNameById(programaId).subscribe(programa => {
      console.log(programa.programName); // Ciencias de la Computacion
      return programa.programName;
    }, error => {
      console.error("Error fetching program name:", error);
      return "Desconocido";
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSubjects = this.subjects
      return
    }

    this.filteredSubjects = this.subjects.filter(
      (subject) =>
        subject.publicationStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  notas(subjectId: number): void {
    this.router.navigate(["/teacher/cursos/notas", subjectId])
  }

  cancel(): void {
    this.router.navigate(["/teacher"]);
  }
}

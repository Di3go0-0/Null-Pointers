import { Component, OnInit } from '@angular/core';
import { MateriaInstanciada } from '../../../models/materia-instanciada';
import { Materia } from '../../../models/materia';
import { MateriasService } from '../../../services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../services/profesores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materias',
  imports: [CommonModule, FormsModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent implements OnInit {
  subjects: MateriaInstanciada[] = []
  filteredSubjects: MateriaInstanciada[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Materia[] = []
  teachersMap: { [id: number]: string } = {};
  isEditing: any
  teacherId: number = 0;

  constructor(
    private materiasService: MateriasService,
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
    this.profesorService.getCourseInstancesActiveByTeacher(this.teacherId).subscribe({
      next: (allSubjects) => {
        // Filtrar solo aquellas instancias que coincidan con el materiaId actual
        const filtered = allSubjects

        this.subjects = filtered;
        this.filteredSubjects = filtered;
        this.profesorService.getMateriaById(allSubjects[0].courseId).subscribe(materiaResponse => {
          if (!materiaResponse || materiaResponse.length === 0) {
            console.error("Materia not found for courseId:", allSubjects[0].courseId);
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
        subject.semester.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

 

  notas(subjectId: number): void {
    this.router.navigate(["/admin/asignatures/instancias/modificar", subjectId])
  }


  cancel(): void {
    this.router.navigate(["/teacher"]);
  }


}

import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { MateriasService } from "../../../../services/materias.service"
import { Materia } from "../../../../models/materia"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MateriaInstanciada } from "../../../../models/materia-instanciada"

@Component({
  selector: 'app-instanciar-materia',
  imports: [CommonModule, FormsModule],
  templateUrl: './instanciar-materia.component.html',
  styleUrl: './instanciar-materia.component.css'
})
export class InstanciarMateriaComponent {
  subjects: MateriaInstanciada[] = []
  filteredSubjects: MateriaInstanciada[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0

  constructor(
    private materiasService: MateriasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cargar datos de la materia si se está editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.materiaId = +params['id'];
        this.loadSubjects();
      }
    });
  }

  loadSubjects(): void {
    this.isLoading = true
    this.materiasService.getInstanciaById(this.materiaId).subscribe({
      next: (subjects) => {
        this.subjects = subjects
        this.filteredSubjects = subjects
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading subjects:", error)
        this.isLoading = false
      },
    })
  }
  obtenerProgramaNombre(programaId: number){
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
        subject.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  addSubject(): void {
    this.router.navigate(["admin/asignatures/new"])
  }

  editSubject(subjectId: number): void {
    this.router.navigate(["/admin/asignatures/modificar", subjectId])
  }


  assignTeacher(subjectId: number): void {
    // this.router.navigate(["/admin/subjects/assign-teacher", subjectId])
  }

  defineSchedule(subjectId: number): void {
    // this.router.navigate(["/admin/subjects/schedule", subjectId])
  }

  deleteSubject(subjectId: number): void {
    if (confirm("¿Está seguro de que desea eliminar esta asignatura?")) {
      this.materiasService.deleteMateria(subjectId).subscribe({
        next: (id) => {
          alert("Asignatura eliminada correctamente")
          console.log("Subject deleted:", id)
          this.loadSubjects()
        },
        error: (error) => {
          alert("Error al eliminar la asignatura")
          console.error("Error deleting subject:", error)
        },
      })
    }
  }


}

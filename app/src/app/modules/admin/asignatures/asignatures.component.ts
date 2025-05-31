import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { MateriasService } from "../../../services/materias.service"
import { Materia } from "../../../models/materia"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"


@Component({
  selector: 'app-asignatures',
  imports: [CommonModule, FormsModule],
  templateUrl: './asignatures.component.html',
  styleUrl: './asignatures.component.css'
})
export class AsignaturesComponent implements OnInit{
  subjects: Materia[] = []
  filteredSubjects: Materia[] = []
  searchTerm = ""
  isLoading = false
  programasMap: { [id: number]: string } = {};

  constructor(
    private materiasService: MateriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSubjects()
    this.materiasService.getAllPrograms().subscribe({
      next: (programas) => {
        this.programasMap = programas.reduce((map, programa) => {
          map[programa.id] = programa.programName;
          return map;
        }, {} as { [id: number]: string });
      },
      error: (err) => {
        console.error('Error cargando programas:', err);
      }
    });
  }

  loadSubjects(): void {
    this.isLoading = true
    this.materiasService.getAllMaterias().subscribe({
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
  //   obtenerProgramaNombre(programaId: number){
  //       this.materiasService.getProgramNameById(programaId).subscribe(programa => {
  //       console.log(programa.programName); // Ciencias de la Computacion
  //       return 1;
  //     }, error => {
  //       console.error("Error fetching program name:", error);
  //       return "Desconocido";
  //     });
  // }

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


  InstanciarMateria(subjectId: number): void {
    this.router.navigate(["/admin/asignatures/instancias", subjectId])
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


import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { Course } from "../../../models/course"
import { CursosExtensionService } from "../../../services/cursos-extension.service"

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  subjects: Course[] = []
  filteredSubjects: Course[] = []
  searchTerm = ""
  isLoading = false
  programasMap: { [id: number]: string } = {};

  constructor(
    private ExtensionService: CursosExtensionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSubjects()
    this.ExtensionService.getAllPrograms().subscribe({
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
    this.ExtensionService.getAllMaterias().subscribe({
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


  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSubjects = this.subjects
      return
    }

    this.filteredSubjects = this.subjects.filter(
      (subject) =>
        subject.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase())
        || subject.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  addSubject(): void {
    this.router.navigate(["admin/courses/new"])
  }

  editSubject(subjectId: number): void {
    this.router.navigate(["/admin/courses/modificar", subjectId])
  }


  InstanciarMateria(subjectId: number): void {
    this.router.navigate(["/admin/courses/instancias", subjectId])
  }

  deleteSubject(subjectId: number): void {
    if (confirm("¿Está seguro de que desea eliminar este curso de extension?")) {
      this.ExtensionService.deleteMateria(subjectId).subscribe({
        next: (id) => {
          alert("Curso eliminado correctamente")
          console.log("Subject deleted:", id)
          this.loadSubjects()
        },
        error: (error) => {
          alert("Error al eliminar el curso")
          console.error("Error deleting subject:", error)
        },
      })
    }
  }

}


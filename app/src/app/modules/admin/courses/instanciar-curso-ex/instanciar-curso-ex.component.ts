import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { TeacherService } from "../../../../services/profesores.service"
import { CourseInstancia } from "../../../../models/course-instancia"
import { Course } from "../../../../models/course"
import { CursosExtensionService } from "../../../../services/cursos-extension.service"

@Component({
  selector: 'app-instanciar-curso-ex',
  imports: [CommonModule, FormsModule],
  templateUrl: './instanciar-curso-ex.component.html',
  styleUrl: './instanciar-curso-ex.component.css'
})
export class InstanciarCursoExComponent implements OnInit {
  subjects: CourseInstancia[] = []
  filteredSubjects: CourseInstancia[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Course[] = []
  teachersMap: { [id: number]: string } = {};
  isEditing: any

  constructor(
    private materiasService: CursosExtensionService,
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: TeacherService
  ) { }

  ngOnInit(): void {
    // Cargar datos de la materia si se está editando
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.materiaId = +params['id'];
        this.loadMateria();
        this.loadSubjects();
      }
    });
    // carga los profesores
    this.profesorService.getAllTeachers().subscribe({
      next: (profesores) => {
        this.teachersMap = profesores.reduce((map, profesor) => {
          map[profesor.id] = profesor.name;
          return map;
        }, {} as { [id: number]: string });
      },
      error: (err) => {
        console.error('Error cargando profesores:', err);
      }
    });
  }
  loadMateria(): void {
    this.materiasService.getMateriaById(this.materiaId).subscribe({
      next: (materia) => {
        this.materia = materia
        console.log("course loaded:", this.materia);
        this.isLoading = false
      },
      error: (error) => {
        console.error("Error loading course:", error)
        this.isLoading = false
      }
    })
  }

  loadSubjects(): void {
    this.isLoading = true;
    this.materiasService.getAllInstancias().subscribe({
      next: (allSubjects) => {
        // Filtrar solo aquellas instancias que coincidan con el materiaId actual
        const filtered = allSubjects.filter(i => i.extensionCourseId === this.materiaId);

        this.subjects = filtered;
        this.filteredSubjects = filtered;
        console.log("instancias loaded:", this.subjects);
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading subjects:", error);
        this.isLoading = false;
      },
    });
  }
  obtenerProfesorNombre(profesorId: number) {
    this.profesorService.getAllTeachers().subscribe(profesores => {
      const profesor = profesores.find(p => p.id === profesorId);
      if (!profesor) {
        console.error("Profesor not found with ID:", profesorId);
        return "Desconocido";
      }
      console.log("Profesor found:", profesor.name); // Log the teacher's name
      // Return the teacher's name
      return profesor.name;
    }, error => {
      console.error("Error fetching teacher name:", error);
      return "Desconocido";
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
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.publicationStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) 
    )
  }

  addSubject(): void {
    this.router.navigate(["admin/courses/instancias/crear", this.materiaId])
  }

  editSubject(subjectId: number): void {
    this.router.navigate(["/admin/courses/instancias/modificar", subjectId])
  }


  defineSchedule(subjectId: number): void {
    this.router.navigate(["/admin/courses/instancias/Horario/", subjectId])
  }

  deleteSubject(subjectId: number): void {
    if (confirm("¿Está seguro de que desea eliminar esta Instancia?")) {
      this.materiasService.deleteInstanciaMateria(subjectId).subscribe({
        next: (id) => {
          alert("Instancia eliminada correctamente")
          console.log("Subject deleted:", id)
          this.loadSubjects()
        },
        error: (error) => {
          alert("Error al eliminar la Instancia")
          console.error("Error deleting subject:", error)
        },
      })
    }
  }
  cancel(): void {
    this.router.navigate(["/admin/courses"]);
  }


}

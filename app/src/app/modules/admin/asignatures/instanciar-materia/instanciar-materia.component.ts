import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { MateriasService } from "../../../../services/materias.service"
import { Materia } from "../../../../models/materia"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MateriaInstanciada } from "../../../../models/materia-instanciada"
import { TeacherService } from "../../../../services/profesores.service"

@Component({
  selector: 'app-instanciar-materia',
  imports: [CommonModule, FormsModule],
  templateUrl: './instanciar-materia.component.html',
  styleUrl: './instanciar-materia.component.css'
})
export class InstanciarMateriaComponent implements OnInit{
  subjects: MateriaInstanciada[] = []
  filteredSubjects: MateriaInstanciada[] = []
  searchTerm = ""
  isLoading = false
  materiaId: number = 0
  materia: Materia[] = []
  teachersMap: { [id: number]: string } = {};
isEditing: any

  constructor(
    private materiasService: MateriasService,
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
    this.isLoading = true
    this.materiasService.getInstanciasById(this.materiaId).subscribe({
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
        subject.semester.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.groupCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        subject.status.toLowerCase().includes(this.searchTerm.toLowerCase()) 
    )
  }

  addSubject(): void {
    this.router.navigate(["admin/asignatures/instancias/crear", this.materiaId])
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
  cancel(): void {
    this.router.navigate(["/admin/asignatures"]);
  }


}

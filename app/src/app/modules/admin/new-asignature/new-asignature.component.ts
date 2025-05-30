import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MateriasService } from "../../../services/materias.service";
import { MateriaCreate } from "../../../models/materia-create";
import { Programa } from "../../../models/programa";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-new-asignature',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-asignature.component.html',
  styleUrl: './new-asignature.component.css'
})
export class NewAsignatureComponent {
  subjectId: number | null = null;
  isLoading = false;
  isEditing = false;

  materia: MateriaCreate = new MateriaCreate(0, '', '', '', 0); // inicia vacío
  programas: Programa[] = [];

  constructor(
    private router: Router,
    private materiaService: MateriasService
  ) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.materiaService.getAllPrograms().subscribe({
      next: (data) => {
        this.programas = data;
      },
      error: (err) => {
        console.error("Error al cargar programas", err);
      }
    });
  }


  onSubmit(): void {
    // Validar campos obligatorios
    if (
      !this.materia.courseName.trim() ||
      !this.materia.courseCode.trim() ||
      !this.materia.description.trim() ||
      !this.materia.credits ||
      !this.materia.programId
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    this.isLoading = true;
    this.materiaService.createMateria(this.materia).subscribe({
      next: (idMateriaCreada) => {
        console.log('Materia creada con ID:', idMateriaCreada);
        alert('Materia creada exitosamente. con ID: ' + idMateriaCreada);
        this.router.navigate(['/admin']); // o a donde necesites redirigir
      },
      error: (error) => {
        console.error('Error al crear la materia:', error);
        alert('Error al crear la materia. Por favor, inténtelo de nuevo.');
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(["/admin"]);
  }
}

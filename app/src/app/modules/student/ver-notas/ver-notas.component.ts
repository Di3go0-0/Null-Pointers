import { Component, OnInit } from '@angular/core';
import { NotasMaterias } from '../../../models/notas-materias';
import { NotasCursos } from '../../../models/notas-cursos';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MateriasService } from '../../../services/materias.service';
import { CursosExtensionService } from '../../../services/cursos-extension.service';

@Component({
  selector: 'app-ver-notas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-notas.component.html',
  styleUrl: './ver-notas.component.css'
})
export class VerNotasComponent implements OnInit {

  notasMaterias: NotasMaterias[] = [];
  notasCursos: NotasCursos[] = [];
  studentId!: number;
  loading = true;
  error = '';
  materiaNombres: { [key: number]: string } = {};
  cursoNombres: { [key: number]: string } = {};

  constructor(
    private studentService: StudentService,
    private materiasService: MateriasService,
    private cursosExtensionService: CursosExtensionService
  ) { }

  ngOnInit(): void {
    this.studentService.getId().subscribe({
      next: (id) => {
        this.studentId = id;
        this.loadNotas();
      },
      error: () => {
        this.error = 'No se pudo obtener el ID del estudiante.';
        this.loading = false;
      }
    });
  }

  loadNotas(): void {
    this.loading = true;

    this.studentService.getGradesMateriasBystudentId(this.studentId).subscribe({
      next: (notas) => {
        this.notasMaterias = notas;
        notas.forEach(nota => {
          const instanciaId = nota.courseInstanceId;
          this.materiasService.getCourseNameByInstanciaId(instanciaId).subscribe({
            next: (nombre) => this.materiaNombres[instanciaId] = nombre,
            error: () => this.materiaNombres[instanciaId] = 'Materia no encontrada'
          });
        });
      },
      error: () => this.error = 'Error al obtener notas de materias.'
    });

    this.studentService.getGradesCoursesBystudentId(this.studentId).subscribe({
      next: (notas) => {
        this.notasCursos = notas;
        notas.forEach(nota => {
          const instanciaId = nota.extensionCourseInstanceId;
          this.cursosExtensionService.getCourseNameByInstanciaId(instanciaId).subscribe({
            next: (nombre) => this.cursoNombres[instanciaId] = nombre,
            error: () => this.cursoNombres[instanciaId] = 'Curso no encontrado'
          });
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al obtener notas de cursos.';
        this.loading = false;
      }
    });
  }
}
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotasCursos } from '../../../../models/notas-cursos';
import { StudentInfo } from '../../../../models/student-info';
import { ActivatedRoute } from '@angular/router';
import { CursosExtensionService } from '../../../../services/cursos-extension.service';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-notas-cursos',
  imports: [CommonModule, FormsModule],
  templateUrl: './notas-cursos.component.html',
  styleUrl: './notas-cursos.component.css'
})
export class NotasCursosComponent implements OnInit {

  instanciaId!: number;
  notas: NotasCursos[] = [];
  students: StudentInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private materiasService: CursosExtensionService,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.instanciaId = Number(this.route.snapshot.paramMap.get('id'));

    this.materiasService.getNotasByInstanciaId(this.instanciaId).subscribe((notas: NotasCursos[]) => {
      this.notas = notas;
      this.studentService.getstudents().subscribe((students: StudentInfo[]) => {
        this.students = students;
        this.notas.forEach(nota => this.calcularFinal(nota));
      });
    });
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.name : 'Desconocido';
  }

  calcularFinal(nota: NotasCursos): void {
    const term1 = parseFloat(nota.term1_grade ?? '');
    const term2 = parseFloat(nota.term2_grade ?? '');
    const term3 = parseFloat(nota.term3_grade ?? '');

    if (!isNaN(term1) && !isNaN(term2) && !isNaN(term3)) {
      const promedio = ((term1 + term2 + term3) / 3).toFixed(2);
      nota.final = promedio; // lo guarda como string
    } else {
      nota.final = null;
    }
  }

  guardarCambios(): void {
    this.notas.forEach(nota => {
      this.materiasService.actualizarNotas(nota.id, nota).subscribe(() => {
        console.log(`Nota actualizada para el estudiante ${nota.studentId}`);
      });
    });

    alert('Todas las notas fueron actualizadas.');
    this.location.back();
  }
  goBack(): void {
    this.location.back(); // Regresa a la ruta anterior en el historial
  }
  esNotaValida(nota: string | null): boolean {
    if (nota === null || nota === '') return false;
    const num = parseFloat(nota);
    return !isNaN(num) && num >= 0 && num <= 5;
  }

  tieneErrores(): boolean {
    return this.notas.some(nota =>
      !this.esNotaValida(nota.term1_grade) ||
      !this.esNotaValida(nota.term2_grade) ||
      !this.esNotaValida(nota.term3_grade)
    );
  }
}


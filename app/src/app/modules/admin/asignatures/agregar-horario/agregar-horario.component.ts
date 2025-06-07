import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../../../../services/materias.service';
import { HorarioMateria } from '../../../../models/horario-materia';


@Component({
  selector: 'app-agregar-horario',
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-horario.component.html',
  styleUrl: './agregar-horario.component.css'
})
export class AgregarHorarioComponent {
  isLoading = false;
  instanciaId: number = 0;
  horario: HorarioMateria = new HorarioMateria(0, 0, '', 0, 0, '');
  dias: { label: string, value: string }[] = [
    { label: 'Lunes', value: 'Monday' },
    { label: 'Martes', value: 'Tuesday' },
    { label: 'Miércoles', value: 'Wednesday' },
    { label: 'Jueves', value: 'Thursday' },
    { label: 'Viernes', value: 'Friday' },
    { label: 'Sábado', value: 'Saturday' }
  ];

  // Variables temporales para inputs de hora tipo string ("14:00")
  startTimeStr: string = '';
  endTimeStr: string = '';
  horas: { value: string, label: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    this.instanciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.horario.courseInstanceId = this.instanciaId;
    this.generarHoras();
  }
  generarHoras(): void {
    this.horas = Array.from({ length: 24 }, (_, i) => {
      const hora12 = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? 'AM' : 'PM';
      const label = `${hora12}:00 ${ampm}`;
      const value = `${i}:00`; // se guarda como "13:00", "9:00", etc.
      return { value, label };
    });
  }

  onSubmit(): void {
    if (!this.horario.day || !this.startTimeStr || !this.endTimeStr || !this.horario.classroom) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Convertir horas "14:00" -> 14
    const startHour = parseInt(this.startTimeStr.split(':')[0], 10);
    const endHour = parseInt(this.endTimeStr.split(':')[0], 10);

    if (isNaN(startHour) || isNaN(endHour) || startHour >= endHour) {
      alert("Hora de inicio y fin inválidas.");
      return;
    }

    this.horario.startTime = startHour;
    this.horario.endTime = endHour;

    this.isLoading = true;
    this.materiasService.createHorarioMateria(this.horario).subscribe({
      next: () => {
        alert("Horario creado exitosamente.");
        this.router.navigate(['/admin/asignatures/instancias/Horario', this.instanciaId]);
      },
      error: (err) => {
        console.error("Error al crear horario:", err);
        alert("Error al crear el horario.");
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/asignatures/instancias/Horario', this.instanciaId]);
  }
}
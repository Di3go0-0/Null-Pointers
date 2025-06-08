import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { User } from "../../../models/user"
import { ReportesService } from "../../../services/reportes.service"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EstudiantesMatriculados } from "../../../models/reportes/estudiantes-matriculados"
import { Teacher } from "../../../models/teacher"
import { EnrollmentCourseEx } from "../../../models/enrollment-course-ex"
import { Course } from "../../../models/course"
import { CourseInstancia } from "../../../models/course-instancia"
import { StudentInfo } from "../../../models/student-info"


interface ReportCategory {
  id: string
  title: string
  description: string
  icon: string
  bgColor: string
  route: string
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  isGeneratingTeachersReport: boolean = false;

  currentUser: User | null = null
  searchTerm = ""


  isGeneratingStudentsReport: boolean = false;

  constructor(
    private router: Router,
    private reportsService: ReportesService,
  ) { }
  descargarPDFEstudiantesMatriculados(): void {
    this.isGeneratingStudentsReport = true;
    this.reportsService.getEstudiantes().subscribe((data: EstudiantesMatriculados[]) => {
      const estudiantesEnrolled = data.filter(est => est.status === 'Enrolled');

      const doc = new jsPDF();

      // Título
      doc.setFontSize(16);
      doc.text('Estudiantes Matriculados', 14, 20);

      // Crear tabla
      autoTable(doc, {
        startY: 30,
        head: [['Programa Académico', 'Nombre del Estudiante', 'Fecha de Matrícula']],
        body: estudiantesEnrolled.map(est => [
          est.academicProgramName,
          est.studentName,
          new Date(est.enrollmentDate).toLocaleDateString()
        ])
      });

      // Descargar el archivo
      doc.save('EstudiantesMatriculados.pdf');
    });
    this.isGeneratingStudentsReport = false;
  }

  descargarPDFDocentes(): void {
    this.reportsService.getDocentes().subscribe((docentes: Teacher[]) => {
      const doc = new jsPDF();

      // Título del PDF
      doc.setFontSize(16);
      doc.text('Docentes', 14, 20);

      // Crear la tabla
      autoTable(doc, {
        startY: 30,
        head: [['Nombre', 'Tipo de Contrato', 'Especialidad', 'Salario Base']],
        body: docentes.map(d => [
          d.name,
          d.contractName,
          d.specialty,
          `$${d.baseSalary.toLocaleString()}`
        ])
      });

      // Descargar el PDF
      doc.save('Docentes.pdf');
    });
  }

  generateInscritosExtensionPDF(): void {
    this.reportsService.getEnrollmentCourseExtension().subscribe(async (enrollments: EnrollmentCourseEx[]) => {
      const doc = new jsPDF();
      const tableData: any[] = [];

      const filteredEnrollments = enrollments.filter(e => e.status === 'Enrolled');

      for (const enrollment of filteredEnrollments) {
        try {
          const [course, student] = await Promise.all([
            this.reportsService.getCourseExtensionByInstanceId(enrollment.extensionCourseInstanceId).toPromise(),
            this.reportsService.getStudentById(enrollment.studentId).toPromise()
          ]);

          // Validar que ambos existan
          if (course && student) {
            console.log('Course:', course);
            console.log('Student:', student);
            tableData.push([
              course[0].courseName,
              student[0].name,
              new Date(enrollment.enrollmentDate).toLocaleDateString()
            ]);
          }
        } catch (error) {
          console.error(`Error procesando inscripción ID ${enrollment.id}:`, error);
        }
      }

      doc.setFontSize(14);
      doc.text('Inscritos en cursos de extensión', 14, 15);
      autoTable(doc, {
        startY: 20,
        head: [['Nombre del curso', 'Nombre del estudiante', 'Fecha de inscripción']],
        body: tableData
      });

      doc.save('inscritos-extension.pdf');
    });
  }

  navigateToCategory(route: string) {
    this.router.navigate([route])
  }

  goBack() {
    this.router.navigate(["/admin"])
  }

  get currentYear() {
    return new Date().getFullYear()
  }

}
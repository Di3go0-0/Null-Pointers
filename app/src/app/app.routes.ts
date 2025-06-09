import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { UsersComponent } from './modules/admin/users/users.component';
import { NewUserComponent } from './modules/admin/new-user/new-user.component';
import { CoursesComponent } from './modules/admin/courses/courses.component';
import { AsignaturesComponent } from './modules/admin/asignatures/asignatures.component';
import { NewAsignatureComponent } from './modules/admin/new-asignature/new-asignature.component';
import { ReportsComponent } from './modules/admin/reports/reports.component';
import { ModificarMateriaComponent } from './modules/admin/asignatures/modificar-materia/modificar-materia.component';
import { InstanciarMateriaComponent } from './modules/admin/asignatures/instanciar-materia/instanciar-materia.component';
import { CrearInstanciaComponent } from './modules/admin/asignatures/crear-instancia/crear-instancia.component';
import { ModificarInstanciaComponent } from './modules/admin/asignatures/modificar-instancia/modificar-instancia.component';
import { HorarioInstanciaComponent } from './modules/admin/asignatures/horario-instancia/horario-instancia.component';
import { AgregarHorarioComponent } from './modules/admin/asignatures/agregar-horario/agregar-horario.component';
import { NewTeacherComponent } from './modules/admin/new-user/new-teacher/new-teacher.component';
import { NewStudentComponent } from './modules/admin/new-user/new-student/new-student.component';
import { ModificarCursoExComponent } from './modules/admin/courses/modificar-curso-ex/modificar-curso-ex.component';
import { NuevoCursoExComponent } from './modules/admin/courses/nuevo-curso-ex/nuevo-curso-ex.component';
import { InstanciarCursoExComponent } from './modules/admin/courses/instanciar-curso-ex/instanciar-curso-ex.component';
import { CrearInstanciaExComponent } from './modules/admin/courses/crear-instancia-ex/crear-instancia-ex.component';
import { ModificarInstanciaExComponent } from './modules/admin/courses/modificar-instancia-ex/modificar-instancia-ex.component';
import { HorarioInstanciaExComponent } from './modules/admin/courses/horario-instancia-ex/horario-instancia-ex.component';
import { AgregarHorarioExComponent } from './modules/admin/courses/agregar-horario-ex/agregar-horario-ex.component';
import { EditUserComponent } from './modules/admin/users/edit-user/edit-user.component';
import { HorarioUserComponent } from './modules/admin/users/horario-user/horario-user.component';
import { TeacherComponent } from './modules/teacher/teacher.component';
import { HomeTeacherComponent } from './modules/teacher/home-teacher/home-teacher.component';
import { HorarioTeacerComponent } from './modules/teacher/horario-teacer/horario-teacer.component';
import { MateriasComponent } from './modules/teacher/materias/materias.component';
import { NotasMaterias } from './models/notas-materias';
import { NotasMateriasComponent } from './modules/teacher/materias/notas-materias/notas-materias.component';
import { CursosComponent } from './modules/teacher/cursos/cursos.component';
import { NotasCursosComponent } from './modules/teacher/cursos/notas-cursos/notas-cursos.component';
import { HomeStudentComponent } from './modules/student/home-student/home-student.component';
import { HorarioStudentComponent } from './modules/student/horario-student/horario-student.component';
import { MateriasStudentComponent } from './modules/student/materias-student/materias-student.component';
import { CursosStudentComponent } from './modules/student/cursos-student/cursos-student.component';
import { StudentComponent } from './modules/student/student.component';
import { InscribirMateriaComponent } from './modules/student/inscribir-materia/inscribir-materia.component';
import { InscribirCursoComponent } from './modules/student/inscribir-curso/inscribir-curso.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: HomeComponent,
        children: [
            { path: '', component: DashboardComponent }, // /admin
            { path: 'users', component: UsersComponent },   // /admin/users
            { path: 'users/new', component: NewUserComponent },// /admin/users/new
            { path: 'users/new/teacher', component: NewTeacherComponent },// /admin/users/new/teacher
            { path: 'users/new/student', component: NewStudentComponent },// /admin/users/new/student
            { path: 'users/editar/:tipo/:id', component: EditUserComponent }, // /admin/users/modificar/:tipo/:id
            { path: 'users/horario/:tipo/:id', component: HorarioUserComponent }, // /admin/users/horario/:tipo/:id
            { path: 'asignatures', component: AsignaturesComponent },
            { path: 'asignatures/modificar/:id', component: ModificarMateriaComponent },
            { path: 'asignatures/new', component: NewAsignatureComponent },
            { path: 'asignatures/instancias/:id', component: InstanciarMateriaComponent },
            { path: 'asignatures/instancias/crear/:id', component: CrearInstanciaComponent },
            { path: 'asignatures/instancias/modificar/:id', component: ModificarInstanciaComponent },
            { path: 'asignatures/instancias/Horario/:id', component: HorarioInstanciaComponent },
            { path: 'asignatures/instancias/Horario/crear/:id', component: AgregarHorarioComponent },
            { path: 'courses', component: CoursesComponent  },
            { path: 'courses/modificar/:id', component: ModificarCursoExComponent },
            { path: 'courses/new', component: NuevoCursoExComponent },
            { path: 'courses/instancias/:id', component: InstanciarCursoExComponent },
            { path: 'courses/instancias/crear/:id', component: CrearInstanciaExComponent },
            { path: 'courses/instancias/modificar/:id', component: ModificarInstanciaExComponent },
            { path: 'courses/instancias/Horario/:id', component: HorarioInstanciaExComponent },
            { path: 'courses/instancias/Horario/crear/:id', component: AgregarHorarioExComponent },
            { path: 'reports', component: ReportsComponent }
          
        ]
    },
    {
        path: 'teacher',
        component: TeacherComponent,
        children: [
            { path: '', component: HomeTeacherComponent }, // /teacher
            { path: 'horario', component: HorarioTeacerComponent},
            { path: 'asignaturas', component: MateriasComponent},
            { path: 'asignaturas/notas/:id', component: NotasMateriasComponent},
            { path: 'cursos', component: CursosComponent},
            { path: 'cursos/notas/:id', component: NotasCursosComponent}
        ]
    },
    {
        path: 'student',
        component: StudentComponent,
        children: [
            { path: '', component: HomeStudentComponent }, // /teacher
            { path: 'horario', component: HorarioStudentComponent},
            { path: 'asignaturas', component: MateriasStudentComponent},
            { path: 'asignaturas/inscribir/:id', component: InscribirMateriaComponent},
            { path: 'cursos', component: CursosStudentComponent},
            { path: 'cursos/inscribir/:id', component: InscribirCursoComponent}
        ]
    },
    { path: 'profile', component: ProfileComponent },

    // Para rutas no registradas
    { path: '**', component: ErrorComponent }
];

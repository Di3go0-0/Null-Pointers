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
            { path: 'courses', component: CoursesComponent },
            { path: 'asignatures', component: AsignaturesComponent },
            { path: 'asignatures/modificar/:id', component: ModificarMateriaComponent },
            { path: 'asignatures/new', component: NewAsignatureComponent },
            { path: 'asignatures/instancias/:id', component: InstanciarMateriaComponent },
            { path: 'asignatures/instancias/crear/:id', component: CrearInstanciaComponent },
            { path: 'asignatures/instancias/modificar/:id', component: ModificarInstanciaComponent },
            { path: 'asignatures/instancias/Horario/:id', component: HorarioInstanciaComponent },
            { path: 'asignatures/instancias/Horario/crear/:id', component: AgregarHorarioComponent },
            { path: 'reports', component: ReportsComponent }
            // etc.
        ]
    },
    { path: 'profile', component: ProfileComponent },

    // Para rutas no registradas
    { path: '**', component: ErrorComponent }
];

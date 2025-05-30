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
            { path: 'courses', component: CoursesComponent },
            { path: 'asignatures', component: AsignaturesComponent },
            { path: 'asignatures/modificar/:id', component: ModificarMateriaComponent },
            { path: 'asignatures/new', component: NewAsignatureComponent },
            { path: 'reports', component: ReportsComponent }
            // etc.
        ]
    },
    { path: 'profile', component: ProfileComponent },

    // Para rutas no registradas
    { path: '**', component: ErrorComponent }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './modules/profile/profile.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: HomeComponent},
    {path: 'profile',component: ProfileComponent},

    // Para rutas no registradas
    {path: '**', component: ErrorComponent}
];

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-teacher',
  imports: [CommonModule],
  templateUrl: './home-teacher.component.html',
  styleUrl: './home-teacher.component.css'
})
export class HomeTeacherComponent {
  constructor(
    private router: Router
  ){}
selectUserType(route: string) {
   return this.router.navigate([`/teacher/${route}`]);
}

}

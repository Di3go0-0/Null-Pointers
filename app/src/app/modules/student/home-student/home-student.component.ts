import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-student',
  imports: [CommonModule],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css'
})
export class HomeStudentComponent {
  constructor(
    private router: Router
  ) { }
  selectUserType(route: string) {
    return this.router.navigate([`/student/${route}`]);
  }

}

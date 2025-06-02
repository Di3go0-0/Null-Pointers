import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  constructor(private router: Router){}

  selectUserType(userType: "student" | "teacher"): void {
    this.router.navigate(["/admin/users/new/" + userType]);
  }
  goBack(): void {
    this.router.navigate(["/admin"])
  }

}

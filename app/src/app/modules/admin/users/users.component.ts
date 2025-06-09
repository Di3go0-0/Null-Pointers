import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentInfo } from '../../../models/student-info';
import { Teacher } from '../../../models/teacher';
import { StudentService } from '../../../services/student.service';
import { TeacherService } from '../../../services/profesores.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  currentView: 'students' | 'teachers' = 'teachers';
  searchTerm = '';
  isLoading = false;

  students: StudentInfo[] = [];
  filteredStudents: StudentInfo[] = [];

  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.studentService.getstudents().subscribe(students => {
      this.students = this.filteredStudents = students;
    });

    this.teacherService.getAllTeachers().subscribe(teachers => {
      this.teachers = this.filteredTeachers = teachers;
    });

    this.isLoading = false;
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    if (this.currentView === 'students') {
      this.filteredStudents = this.students.filter(
        s => s.name.toLowerCase().includes(term) || s.email.toLowerCase().includes(term)
      );
    } else {
      this.filteredTeachers = this.teachers.filter(
        t =>
          t.name.toLowerCase().includes(term) ||
          t.email.toLowerCase().includes(term) ||
          t.specialty.toLowerCase().includes(term)
      );
    }
  }
  horarioSubject(userId: number, userType: 'student' | 'teacher') {
    this.router.navigate(['/admin/users/horario', userType, userId]);
  }
  editSubject(userId: number, userType: 'student' | 'teacher') {
    this.router.navigate(['/admin/users/editar', userType, userId]);
  }
  addSubject(){
    this.router.navigate(['/admin/users/new']);
  }
}
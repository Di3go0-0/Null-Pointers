import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentInfo } from '../../../models/student-info';
import { Teacher } from '../../../models/teacher';
import { StudentService } from '../../../services/student.service';
import { TeacherService } from '../../../services/profesores.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
editSubject(arg0: any) {
throw new Error('Method not implemented.');
}
  currentView: 'students' | 'teachers' = 'students';
  searchTerm = '';
  isLoading = false;

  students: StudentInfo[] = [];
  filteredStudents: StudentInfo[] = [];

  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

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
}
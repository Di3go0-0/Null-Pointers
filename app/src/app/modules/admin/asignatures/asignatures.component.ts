import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import type { ActivatedRoute, Router } from "@angular/router"

interface Teacher {
  id: number
  name: string
  specialization: string
  experience: string
  email: string
  avatar?: string
  isAssigned?: boolean
}

@Component({
  selector: 'app-asignatures',
  imports: [CommonModule],
  templateUrl: './asignatures.component.html',
  styleUrl: './asignatures.component.css'
})
export class AsignaturesComponent {
teachers: Teacher[] = []
  filteredTeachers: Teacher[] = []
  subjectId: number | null = null
  subjectName = ""
  searchTerm = ""
  isLoading = false

  constructor(
    
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   if (params["id"]) {
    //     this.subjectId = +params["id"]
    //     this.loadSubjectInfo()
    //     this.loadTeachers()
    //   }
    // })
  }

  loadSubjectInfo(): void {
    if (!this.subjectId) return

    // this.subjectService.getSubject(this.subjectId).subscribe({
    //   next: (subject: { name: string }) => {
    //     this.subjectName = subject.name
    //   },
    //   error: (error: any) => {
    //     console.error("Error loading subject:", error)
    //   },
    // })
  }

  loadTeachers(): void {
    this.isLoading = true
    // this.teacherService.getAvailableTeachers().subscribe({
    //   next: (teachers: Teacher[]) => {
    //     this.teachers = teachers
    //     this.filteredTeachers = teachers
    //     this.isLoading = false
    //   },
    //   error: (error: any) => {
    //     console.error("Error loading teachers:", error)
    //     this.isLoading = false
    //   },
    // })
  }

  onSearch(): void {
    // if (!this.searchTerm.trim()) {
    //   this.filteredTeachers = this.teachers
    //   return
    // }

    // this.filteredTeachers = this.teachers.filter(
    //   (teacher) =>
    //     teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     teacher.specialization.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
    // )
  }

  assignTeacher(teacherId: number): void {
    if (!this.subjectId) return

    // this.teacherService.assignTeacherToSubject(teacherId, this.subjectId).subscribe({
    //   next: () => {
    //     this.router.navigate(["/admin/subjects"])
    //   },
    //   error: (error: any) => {
    //     console.error("Error assigning teacher:", error)
    //   },
    // })
  }

  goBack(): void {
    // this.router.navigate(["/admin/subjects"])
  }

}


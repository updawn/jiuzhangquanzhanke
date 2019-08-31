import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    classeNametoAdd: string;
    classeLocationtoAdd: string;
    classeContenttoAdd: string;
    classeTeacherIdtoAdd: number;
    classeNametoDelete: string;
    classeNametoUpdate: string;
    classeLocationtoUpdate: string;
    classeContenttoUpdate: string;
    classeTeacherIdtoUpdate: number;
    courses: CourseDto[] = [];
    coursesWithTN: CourseWithTNDto[] = [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    // registerCourse(courseName) {
    //
    // }

    addCourse() {
        const courseToAdd: CourseDto = {
            courseName: this.classeNametoAdd,
            courseLocation: this.classeLocationtoAdd,
            courseContent: this.classeContenttoAdd,
            teacherId: this.classeTeacherIdtoAdd
        };
        this.courseService.add(courseToAdd).subscribe(() => this.getAllCourses());
    }

    updateCourse() {
        const courseToUpdate: CourseDto = {
            courseName: this.classeNametoUpdate,
            courseLocation: this.classeLocationtoUpdate,
            courseContent: this.classeContenttoUpdate,
            teacherId: this.classeTeacherIdtoUpdate
        };
        this.courseService.update(courseToUpdate).subscribe(() => this.getAllCourses());
    }

    deleteCourse() {
        this.courseService.delete(this.classeNametoDelete).subscribe(() => this.getAllCourses());
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearAllCourseswithTN() {
        this.coursesWithTN = [];
    }
}

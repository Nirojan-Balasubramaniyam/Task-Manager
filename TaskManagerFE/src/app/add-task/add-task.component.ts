import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  TaskService } from '../../Services/task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  UserService } from '../../Services/user.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]],
      assigneeId: ['']
    })
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users =data;
    })
  }

  onSubmit() {
    let task = this.taskForm.value;
    console.log(task)

    this.taskService.addTask(task).subscribe(data => {

      this.toastr.success("Task created successfully", "Task Creation", {
        timeOut: 10000,
        closeButton: true,
        easing: 'ease-in',
        progressBar: true,
        toastClass: 'ngx-toastr'
      })
      //alert("Task created successfully")
      this.router.navigate(["/task"]);
    })
  }

  onReset() {
    this.taskForm.reset();
  }
}

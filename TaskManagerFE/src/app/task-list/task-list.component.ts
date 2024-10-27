import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../Models/task';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {


  tasks: Task[] = [];
  searchText: string = "";
  modalRef?:  BsModalRef;
  taskId:number=0;

  constructor(private taskService: TaskService, private router: Router, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onDelete(taskId: number) {
    if (confirm("Do you want to delete the Task")) {
    this.taskService.deleteTask(taskId).subscribe(data => {
    
        //alert("Task deleted successfully");
        this.toastr.success("Task deleted successfully", "Task Delete", {
          timeOut: 5000,
          closeButton: true,
          easing: 'ease-in',
          progressBar: true,
        })
    
      this.onLoad();
    })
  }
  }

  onLoad() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(this.tasks)
    })
  }

  onEdit(id: number) {
    this.router.navigate(["/edit-task", id])

  }

  openModal(template: TemplateRef<void>, Id:number) {
    this.taskId = Id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  decline() {
    this.modalRef?.hide();
  }

  confirm() {
    this.taskService.deleteTask(this.taskId).subscribe(data => {
    
      //alert("Task deleted successfully");
      this.toastr.success("Task deleted successfully", "Task Delete", {
        timeOut: 5000,
        closeButton: true,
        easing: 'ease-in',
        progressBar: true,
      })
  
    this.onLoad();
  })
    this.modalRef?.hide();
  }
}

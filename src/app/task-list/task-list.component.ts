import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../Services/task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  searchText: string = "";
  
  constructor(private taskService: TaskService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onDelete(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(data => {
      if(confirm("Do you want to delete the Task")){
        //alert("Task deleted successfully");
        this.toastr.success("Task deleted successfully","Task Delete",{
          timeOut: 5000,
          closeButton: true,
          easing: 'ease-in',
          progressBar: true,
        })
      }
      this.onLoad();
    })
  }

  onLoad() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(this.tasks)
    })
  }

  onEdit(id: number) {
    this.router.navigate(["/edit-task",id])

  }
}

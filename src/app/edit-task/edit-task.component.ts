import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  taskForm: FormGroup;
  taskId: number;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {

    const fetchedId = this.route.snapshot.paramMap.get("id");
    this.taskId = Number(fetchedId);

    this.taskForm = this.fb.group({

      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]]
      
    })


  }

  ngOnInit(): void {
    this.taskService.getTask(this.taskId).subscribe(data => {

      let dueDate = new Date(data.dueDate).toISOString().slice(0, 10);
      console.log(data);

      this.taskForm.patchValue({
        id: data.id,
        title: data.title,
        description: data.description,
        dueDate: dueDate,
        priority: data.priority
      });
    }, error => {

      this.toastr.error("Task is not Found");

    })
  }

  onReset() {
    this.taskForm.reset();
  }
  onSubmit() {
    let task = this.taskForm.value;

    this.taskService.updateTask(task).subscribe(data => {

      this.toastr.success("Task updated Successfully", "Task Update", {
        timeOut: 10000,
        closeButton: true,
        easing: 'ease-in',
        progressBar: true,
        toastClass: 'ngx-toastr'
      });

      this.router.navigate(["/task"]);

    })
  }
}

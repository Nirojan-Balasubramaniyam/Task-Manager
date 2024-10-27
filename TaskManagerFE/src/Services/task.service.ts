import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { Task } from '../app/Models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url:string = "https://localhost:7203/api/TaskItems";
  constructor(private http: HttpClient) { }
  getTasks(){
   return this.http.get<Task>(this.url ).pipe(
    map((res:any) =>{
      if(res){
        return res.map((task:any) => new Task(task));
      }
    })
   )
  }

  getTask(taskId:number){
    return this.http.get<Task>(this.url + "/" + taskId)
  }

  addTask(newTask:any){
    return this.http.post(this.url,newTask);
  }

  updateTask(task:Task){
    return this.http.put(this.url + "/" + task.id, task);
  }

  deleteTask(taskId:number){
    return this.http.delete(this.url + "/" + taskId);
  }
}

// export interface Task{
//   id:number,
//   title:string,
//   description:string,
//   dueDate:string,
//   priority:string,
//   assignee: User
// }

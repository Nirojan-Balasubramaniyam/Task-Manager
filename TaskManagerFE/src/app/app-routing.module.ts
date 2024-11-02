import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './Register/register/register.component';
import { LoginComponent } from './Login/login/login.component';

const routes: Routes = [
  {path: 'task', component: TaskListComponent },
  {path: 'user', component: UserListComponent },
  {path:'add-user', component:UserComponent},
  {path:'add-task', component:AddTaskComponent},
  {path:'edit-task/:id', component:EditTaskComponent},
  {path:'edit-user/:id', component:UserComponent},
  {path:'registration', component:RegisterComponent},
  {path:'sigin', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

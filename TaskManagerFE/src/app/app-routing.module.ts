import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterComponent } from './Register/register/register.component';
import { LoginComponent } from './Login/login/login.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './Layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {path:'',
    component:BlankLayoutComponent,
    children:[
      {path:'registration', component:RegisterComponent},
      {path:'login', component:LoginComponent}
    ]
  },

  {path:'admin',
    component:AdminLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {path: 'task', component: TaskListComponent },
      {path: 'user', component: UserListComponent },
      {path:'add-user', component:UserComponent},
      {path:'add-task', component:AddTaskComponent},
      {path:'edit-task/:id', component:EditTaskComponent},
      {path:'edit-user/:id', component:UserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

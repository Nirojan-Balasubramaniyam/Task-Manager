import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  searchText: string = "";
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onDelete(userId: number) {
    if (confirm("Do you want to delete the User")) {

      this.userService.deleteUser(userId).subscribe(data => {
        //alert("User deleted successfully");
        this.toastr.success("User deleted successfully", "User Delete", {
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
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users)
    })
  }

  onEdit(id: number) {
    this.router.navigate(["/edit-user", id])

  }


}

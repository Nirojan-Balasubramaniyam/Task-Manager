import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/user.service';
import { loginRequest } from '../../Models/loginRequest';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })

  }
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: loginRequest = this.loginForm.value;
      console.log(loginData)
      this.userService.login(loginData).subscribe((data) => {
        const userDetail:any = jwtDecode(data) 
        console.log(userDetail)       

        localStorage.setItem("Token", data)
        localStorage.setItem("Name", userDetail.Name)

        this.router.navigate(['admin/task']);
      },
        (error) => {
          this.toastr.error(error.error);
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields.');
    }
  }
}

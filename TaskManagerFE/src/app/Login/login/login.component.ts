import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })
  }
onSubmit() {
throw new Error('Method not implemented.');
}

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.registerForm = this.fb.group({

      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]

    })
  }

 
  onSubmit() {
    throw new Error('Method not implemented.');
  }

}

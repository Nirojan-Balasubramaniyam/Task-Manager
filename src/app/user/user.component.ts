import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userForm: FormGroup;

  isEditMode: boolean = false;
  userId: number;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {

    const fetchedId = this.route.snapshot.paramMap.get("id");
    this.userId = Number(fetchedId);

    if (fetchedId) {
      this.isEditMode = true;
    }

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      password: [''],
      phone: ['', [Validators.required]]
    })
  }



  onSubmit() {
    if (this.userId) {
      
      let user = this.userForm.value;
      user.id=this.userId;
      this.userService.updateUser(user).subscribe(data => {

        this.toastr.success("User updated Successfully", "User Update", {
          timeOut: 10000,
          closeButton: true,
          easing: 'ease-in',
          progressBar: true,
          toastClass: 'ngx-toastr'
        });

        this.router.navigate(["/user"]);

      })

    } else {
      let user = this.userForm.value;
      console.log(user)

      this.userService.addUser(user).subscribe(data => {

        this.toastr.success("User created successfully", "User Creation", {
          timeOut: 10000,
          closeButton: true,
          easing: 'ease-in',
          progressBar: true,
          toastClass: 'ngx-toastr'
        })
        //alert("User created successfully")
        this.router.navigate(["/user"]);
      })
    }

  }

  onReset() {
    this.userForm.reset();
  }

  ngOnInit(): void {
    if(this.userId){
      this.userService.getUser(this.userId).subscribe(data => {

        console.log(data);
  
        this.userForm.patchValue({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password:data.password
        });
      }, error => {
  
        this.toastr.error("User is not Found");
  
      })
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit{

  name:string="";
  constructor(private router:Router){}

  ngOnInit(): void {
    this.name = localStorage.getItem("Name") || "";
  }

  logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("Name");
    this.router.navigate(['/login']);
  }
}

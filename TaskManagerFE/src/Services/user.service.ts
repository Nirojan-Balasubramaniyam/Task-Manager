import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../app/Models/user';
import { loginRequest } from '../app/Models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "https://localhost:7203/api/Users";

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getUser(userId: number) {
    return this.http.get<User>(this.url + "/" + userId)
  }

  addUser(newUser: User) {
    return this.http.post(this.url, newUser);
  }

  updateUser(user: User) {
    return this.http.put(this.url + "/" + user.id, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.url + "/" + userId);
  }

  login(loginRequest: loginRequest) {
    return this.http.post(this.url + '/login' , loginRequest, {
      responseType: 'text'
    })
  }

  isLoggedIn(){
    if(localStorage.getItem("Token")){
      return true;
    }else{
      return false
    }
  }
}

// export interface User {
//   id: number,
//   name: string,
//   email: string,
//   password: string,
//   phone: string
// }
import { IBlog, IUser } from './data.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public blogs: Array<IBlog> = [
    {
    id: 0,
    postedBy: "admin",
    topic: "First post",
    date: Date(),
    message: "Sign up to create and start to use Angular Blog"
    }
  ];

  public users: Array<IUser> = [
    {
      id: 0,
      username: "admin",
      email: "admin@gmail.com",
      password: "admin"
    }
  ];

  updateBlogs(newBlogs: Array<IBlog>){
    this.blogs = newBlogs;
  };

  updateUsers(newUsers: Array<IUser>){
    this.users = newUsers;
  };

  constructor() { }
}

import { Component } from '@angular/core';
import { IBlog } from 'src/app/shared/data.interface';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [DataService]
})
export class MainComponent {

  constructor(
    public dataService: DataService
  ) { };

  public blogs = this.dataService.blogs;
  public users = this.dataService.users;

  public signUpCheck = false;
  public signInCheck = false;
  public addPostCheck = false;
  public signUpAddCheck = false;
  public editCheck = false;
  public modalCheck = false;
  
  public curentUser = '';
  public curentEdit!: number;

  public signInEmail = '';
  public signInPass = '';

  public signUpUsername = '';
  public signUpEmail = '';
  public signUpPassword = '';

  public addPostTitle = '';
  public addPostText = '';

  signIn(): void {
    this.modalCheck = true;
    this.signInCheck = true;
  }

  modalClose(): void {
    this.modalCheck = false;
    this.signInCheck = false;
    this.modalCheck = false;
    this.signUpAddCheck = false;
    this.addPostCheck = false;
    this.editCheck = false;
  }

  signInSubmit(): void {
    for (const elem of this.users) {
      if (this.signInEmail == elem.email && this.signInPass == elem.password) {
        this.curentUser = elem.username;
        this.signUpCheck = true;
        this.signInEmail = '';
        this.signInPass = '';
        this.modalClose();
      }
    }
  }

  signUp(): void{
    this.modalCheck = true;
    this.signUpAddCheck = true;
  }

  signUpSubmit(): void {
    if (this.signUpUsername != '' && this.signUpEmail != '' && this.signUpPassword != '') {
      let uniqueCheck = false;

      for (const elem of this.users) {
        if (this.signUpEmail != elem.email && this.signUpUsername != elem.username) {
          uniqueCheck = true;
        }
      }

      if (uniqueCheck) {
        this.curentUser = this.signUpUsername;
        this.signUpCheck = true;
        
        this.signUpEmail = '';
        this.signUpUsername = '';
        this.signUpPassword = '';
        
        this.modalClose();
      };

      this.dataService.updateUsers(this.users);
    }
  };

  singOut(): void {
    this.curentUser = '';
    this.signUpCheck = false;
    this.addPostCheck = false;
  }

  addPost(): void {
    this.addPostCheck = true;
    this.modalCheck = true;
  }

  addPostSubmit(): void {
    if (this.addPostTitle != '' && this.addPostText != '') {
      let newId = 0;
      
      if(this.blogs.length != 0){
        newId = this.blogs[0].id;
      }

      let object: IBlog = {
        id: newId + 1,
        postedBy: this.curentUser,
        topic: this.addPostTitle,
        date: Date(),
        message: this.addPostText
      };

      this.blogs.push(object);
      this.dataService.updateBlogs(this.blogs);

      this.addPostTitle = '';
      this.addPostText = '';

      this.modalClose();
    }
  }

  editPost(index: number): void{
    this.editCheck = true;
    this.modalCheck = true;
    this.addPostCheck = true;

    this.curentEdit = index;

    this.addPostTitle = this.blogs[index].topic;
    this.addPostText = this.blogs[index].message;

  };

  savePost(): void{
    this.blogs[this.curentEdit].topic = this.addPostTitle;
    this.blogs[this.curentEdit].message = this.addPostText;

    this.addPostTitle = '';
    this.addPostText = '';

    this.modalClose();
    this.dataService.updateBlogs(this.blogs);
  };

  deletePost(index: number): void{
    this.blogs.splice(index, 1);
    this.dataService.updateBlogs(this.blogs);
  };


}

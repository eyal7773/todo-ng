import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm) :void {
    this.tasks.push(addForm.value.task);
    addForm.resetForm();
  }

  handleRemove(removedTask:string) {
    this.tasks = this.tasks.filter( (task) => task != removedTask);
  }


}

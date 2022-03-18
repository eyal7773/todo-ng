import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


interface Task {
  name:string;
  isUpdated:boolean;

}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(addForm:NgForm) :void {
    
    this.tasks.push({ name: addForm.value.task , isUpdated:false});

    addForm.resetForm();
  }

  handleRemove(removedTask:string) {
    this.tasks = this.tasks.filter( (task) => task.name != removedTask);
  }

  handleUpdate(updatedTask:Task) {
    updatedTask.isUpdated = true;
  }

  handleSubmitUpdate(newName:string, oldName:string):void {
    

    let updatedTaskObject:Task = this.tasks.filter(t => t.name === oldName)[0];
    updatedTaskObject.name = newName;
    updatedTaskObject.isUpdated = false;
  }

}

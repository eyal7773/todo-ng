import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


interface Task {
  name:string;
  isUpdated:boolean;
  isVisible:boolean;
}

enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  readonly TASKS_KEY = 'tasks';
  SortEnum = SortOptions;
  tasks:Task[] = [];
  sorted:SortOptions = SortOptions.NONE;


  constructor() { }


  ngOnInit(): void {
    let savedTasks = localStorage.getItem(this.TASKS_KEY);
    if (savedTasks != null ) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  handleSubmit(addForm:NgForm) :void {
    
    this.tasks.push({ name: addForm.value.task , isUpdated:false,isVisible:true});

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

  handleSort(direction:SortOptions) {
    if (direction == this.sorted) {
      this.sorted = SortOptions.NONE;
      return;
    } 

    this.sorted = direction;

    switch (direction) {
      case SortOptions.ASC:
      
        this.tasks = this.tasks.sort((a,b) => {
          let al = a.name.toLowerCase();
          let bl = b.name.toLowerCase();
          if (al < bl ) {
            return -1;
          } 
          if (al > bl) {
            return 1;
          }
          return 0;
        });
        
        break;
    
        case SortOptions.DESC: 
        this.tasks = this.tasks.sort((a,b) => {
          let al = a.name.toLowerCase();
          let bl = b.name.toLowerCase();
          if (al < bl ) {
            return 1;
          } 
          if (al > bl) {
            return -1;
          }
          return 0;
        });
        break;
    
      default:
        break;
    }
  }
  handleSearch(searchText:string) {

    // in case the user delete the search work
    // we will show all the tasks.
    if (searchText === '') {
      this.tasks.forEach( (task) => {
        task.isVisible = true;
     });  
    }

    this.tasks.map((task) => {
       task.isVisible =  (task.name.includes(searchText));
       
    });
      
    
  }

  handleSave() : void {
    localStorage.setItem(this.TASKS_KEY,JSON.stringify(this.tasks))
  }

}

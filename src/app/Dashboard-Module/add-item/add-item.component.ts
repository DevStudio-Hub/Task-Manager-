import { Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  constructor(private TaskService: TaskService, private Router: Router){

  }
  formdata: any = {
    title: '',
    description: '',
    status: 'Pending'
  };
  onSubmit(form:any){
   
   this.TaskService.setTask(this.formdata)
   this.Router.navigate(["/home"])
  }
 
}

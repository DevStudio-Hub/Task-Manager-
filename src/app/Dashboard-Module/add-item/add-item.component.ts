import { Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

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
  formdata: { title: string; description: string; date: string; status: string; } = {
    title: '',
    description: '',
    
    date: '',
    status: 'Pending'
  };
  onSubmit(form:any){
   const finalData = {...this.formdata, date: new Date(this.formdata.date)}
   this.TaskService.setTask(finalData)
   this.Router.navigate(["/home"])
   
  }
 
}

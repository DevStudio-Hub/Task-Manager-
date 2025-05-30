import { Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorShowComponent } from '../../error-show/error-show.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule, ErrorShowComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  constructor(private TaskService: TaskService, private Router: Router) {}
  showError = false
  showErrorMessage = ""
  formdata: {
    title: string;
    description: string;
    date: string;
    status: string;
  } = {
    title: '',
    description: '',

    date: '',
    status: 'Pending',
  };
  isEditMode = false;

  onSubmit(form: any) {
  const finalData = { ...this.formdata, date: new Date(this.formdata.date) };

  const user_id: string | null = localStorage.getItem('user_id');
  if (!user_id) {
    console.error('User not logged in');
    return;
  }

  if (this.isEditMode) {
    const befortitle = this.TaskService.getUpdateTask()?.title;
    const aftertitle = this.formdata.title;

    this.TaskService.updateTaskAPI(
      befortitle,
      aftertitle,
      this.formdata.description,
      this.formdata.status,
      finalData.date,
      user_id
    ).subscribe({
      next: (res: any) => {
        if(!res.success){
          this.showError = true
          this.showErrorMessage = res.message
        }
        console.log('Update Success:', res);
        this.TaskService.updateExistingTask(finalData); 
        this.TaskService.clearUpdateTask();
        this.Router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error updating task:', err);
      },
    });
  } else {
    this.TaskService.addTask(
      this.formdata.title,
      this.formdata.description,
      this.formdata.status,
      this.formdata.date,
      user_id
    ).subscribe((res: any) => {
      console.log('add run', res);
      this.Router.navigate(['/home']);
    });
  }
}

  ngOnInit() {
    const updateData = this.TaskService.getUpdateTask();
    if (updateData) {
      console.log('Edit mode: setting title & description');
      this.formdata.title = updateData.title || '';
      this.formdata.description = updateData.description || '';
      this.isEditMode = true;
    }
  }
}

import { Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  constructor(private TaskService: TaskService, private Router: Router) {}

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

    if (this.isEditMode) {
      this.TaskService.updateExistingTask(finalData);
      this.TaskService.clearUpdateTask();
    } else {
      this.TaskService.setTask(finalData);
    }

    this.Router.navigate(['/home']);
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

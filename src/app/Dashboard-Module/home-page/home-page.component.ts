import { TaskService } from './../../task.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorShowComponent } from '../../error-show/error-show.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, ErrorShowComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor(private taskService: TaskService, private Router: Router) {}
  showError = false;
  showErrorMessage = '';

  sideBarIems = [
    'All Task',
    'Completed',
    'Pending',
    'High Priorty',
    'Due Today',
  ];
  activeBar = 'All Task';

  tasks: {
    title: string;
    description: string;
    date: string;
    status: string;
  }[] = [];
  model: {
    title: string;
    description: string;
    date: string;
    status: string;
  }[] = [];

  setActive(item: string) {
    this.activeBar = item;
  }
  onAddTask() {
    this.taskService.clearUpdateTask();
    this.Router.navigate(['/add-item']);
  }
  isLogin = false;

  username: string = localStorage.getItem('userName') || 'Guest';
  user_id = localStorage.getItem('user_id');

  onLogin() {
    this.Router.navigate(['/login']);
    
  }
  
  
  

  ngOnInit() {
    if(!this.user_id){
      this.isLogin = false;
      this.Router.navigate(['/login']);
      return;
    }
     this.isLogin = true;
    this.taskService.getData(this.user_id).subscribe({
      next: (res: any) => {
        if (!res.success) {
          console.log(res);
          this.showError = true;
          this.showErrorMessage = res.message;
        }
        this.tasks = res.task.map((task: any) => {
          const date = new Date(task.dueTime);
          const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
          };
          let formattedDate = date
            .toLocaleDateString('en-US', options)
            .replace(',', '');

          return {
            ...task,
            date: formattedDate,
          };
        });
      },
    });

    
  }

  logout() {
    console.log('click');
    this.taskService.logout().subscribe((res: any) => {
      if (res.success) {
        this.isLogin = false;
        localStorage.removeItem('userName');
        localStorage.removeItem('user_id');
        this.Router.navigate(['/login']);
      }
      console.log(res);
      console.log('no res');
    });
  }

  onDeleteTask(taskTitle: string) {
    const deletedTask: any = this.tasks.find(
      (task) => task.title === taskTitle
    );
    console.log(this.tasks);
    this.taskService.deleteData(deletedTask.title, this.user_id).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.showError = true;
          this.showErrorMessage = res.message;
          console.log(res);
        }

        this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      },
    });
  }

  search = '';
  get searchItem() {
    let filtered = this.tasks.filter((item) =>
      item.title.toLowerCase().includes(this.search.toLowerCase())
    );
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
    };
    const formattedToday = today
      .toLocaleDateString('en-US', options)
      .replace(',', '');

    switch (this.activeBar) {
      case 'Completed':
        filtered = filtered.filter(
          (task) => task.status.toLowerCase() === 'completed'
        );
        break;
      case 'Pending':
        filtered = filtered.filter(
          (task) => task.status.toLowerCase() === 'pending'
        );
        break;
      case 'High Priorty':
        filtered = filtered.filter(
          (task) => task.status.toLowerCase() === 'high priority'
        );
        break;
      case 'Due Today':
        const today = new Date().toDateString();
        filtered = filtered.filter((task) => task.date === formattedToday);
        break;
    }

    return filtered;
  }

  onEditTask(task: string) {
    const editTask:
      | { title: string; description: string; date: string; status: string }
      | undefined = this.tasks.find((t) => t.title === task);
    if (editTask) {
      this.taskService.setupdateTask(editTask);
      this.Router.navigate(['/add-item']);
    }
  }
}

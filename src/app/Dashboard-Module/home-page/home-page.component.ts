import { TaskService } from './../../task.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink, NgIf, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor(private taskService: TaskService) {} 

  sideBarIems = [
    'All Task',
    'Completed',
    'Pending',
    'High Priorty',
    'Due Today',
  ];
  activeBar = 'All Task';

  tasks: { title: string; description: string; date: string; status: string }[] = [];
  model: { title: string; description: string; date: string; status: string }[] = [];


  setActive(item: string) {
    this.activeBar = item;
  }

  ngOnInit() {
    this.model = this.taskService.getTasks();
  
    this.tasks = this.model.map(task => {
      const date = new Date(task.date);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
      };
      let formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
  
      return {
        ...task,
        date: formattedDate
      };
    });
  }
  

  onDeleteTask(taskTitle: string) {
    
    this.tasks = this.tasks.filter(task => task.title !== taskTitle);
  }
  search = '';
  get searchItem() {
   
    let filtered = this.tasks.filter(item =>
      item.title.toLowerCase().includes(this.search.toLowerCase())
    );
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
    };
    const formattedToday = today.toLocaleDateString('en-US', options).replace(',', '');
    
    switch (this.activeBar) {
      case 'Completed':
        filtered = filtered.filter(task => task.status.toLowerCase() === 'completed');
        break;
      case 'Pending':
        filtered = filtered.filter(task => task.status.toLowerCase() === 'pending');
        break;
      case 'High Priorty':
        filtered = filtered.filter(task => task.status.toLowerCase() === 'high priorty');
        break;
      case 'Due Today':
        const today = new Date().toDateString();
        filtered = filtered.filter(task => task.date === formattedToday);
        break;
    }
  
    return filtered;
  }
  
  
}

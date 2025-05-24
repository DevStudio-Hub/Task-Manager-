import { TaskService } from './../../task.service';
import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink],
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

  tasks: { title: string; description: string; status: string }[] = [];

  task: any;

  setActive(item: string) {
    this.activeBar = item;
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    if (this.task) {
      this.tasks.push(this.task);
    }
  }
}

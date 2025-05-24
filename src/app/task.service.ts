import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: any[] = []; 

  setTask(data: any) {
    this.tasks.push(data);
  }

  getTasks(): any[] {
    return this.tasks; 
  }
}

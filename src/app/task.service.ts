import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: any[] = []; 
  private updateTask: any = null;

  setTask(data: any) {
    this.tasks.push(data);
  }

  getTasks(): any[] {
    return this.tasks; 
  }
 

  setupdateTask(update: any) {
    const index = update
    this.updateTask = index;

  }
  getUpdateTask(): any {
    return this.updateTask; 
}
clearUpdateTask() {
  this.updateTask = null;
}

updateExistingTask(updatedTask: any) {
  const index = this.tasks.findIndex(task => task.title === updatedTask.title);
  if (index !== -1) {
    this.tasks[index] = updatedTask;
  }
}

}

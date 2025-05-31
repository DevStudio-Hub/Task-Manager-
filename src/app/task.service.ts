import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private Router: Router) {}
  API_URL = environment.apiUrl;

  registerUser = (userName: string, email: string, password: string) => {
    const user = { userName, email, password };
    return this.http.post(`${this.API_URL}/api/auth/register`, user, {
      withCredentials: true,
    });
    
  };

  verifyOtp = (email: string, otp: string) => {
    return this.http.post(`${this.API_URL}/api/auth/verifyotp`, {
      email,
      otp,
    });
    
  };

  loginUser = (email: string, password: string) => {
    return this.http.post(
      `${this.API_URL}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    
  };

  useIsVerify = () => {
    return this.http.post(
      `${this.API_URL}/api/auth/isAuth`,
      {},
      { withCredentials: true }
    ).subscribe((res: any) => {
        if (!res.isAuth) {
          console.log(res);
          this.Router.navigate(['/login']);
        }
        console.log(res)
      });;
  };

  logout = () => {
    return this.http.post(
      `${this.API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  };

  addTask = (
    title: string,
    description: string,
    status: string,
    dueTime: string,
    user_ID: string | null
  ) => {
    const tasks = { title, description, status, dueTime, user_ID };
    return this.http.post(`${this.API_URL}/api/task/create`, tasks, {
      withCredentials: true,
    });
  };

  getData = (user_ID: string | null) => {
    return this.http.post(
      `${this.API_URL}/api/task/gettask`,
      { user_ID },
      { withCredentials: true }
    );
  };

  deleteData = (title: string, user_ID: string | null) => {
    return this.http.request('DELETE',
      `${this.API_URL}/api/task/deletetask`,
      { body: { title, user_ID }, withCredentials: true }
    );
  };
updateTaskAPI(
  befortitle: string,
  aftertitle: string,
  description: string,
  status: string,
  dueTime: Date,
  user_ID: string
) {
  return this.http.put(`${this.API_URL}/api/task/updatetask`, {
    befortitle,
    aftertitle,
    description,
    status,
    dueTime,
    user_ID,
  });
}

  private tasks: any[] = [];
  private updateTask: any = null;

  setupdateTask(update: any) {
    const index = update;
    this.updateTask = index;
  }
  getUpdateTask(): any {
    return this.updateTask;
  }
  clearUpdateTask() {
    this.updateTask = null;
  }

  updateExistingTask(updatedTask: any) {
    const index = this.tasks.findIndex(
      (task) => task.title === updatedTask.title
    );
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

}

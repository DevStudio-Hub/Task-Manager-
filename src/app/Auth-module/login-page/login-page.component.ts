import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ErrorShowComponent } from '../../error-show/error-show.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, ErrorShowComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private TaskService: TaskService, private Router: Router) {}

  showError = false;
  showErrorMessage = '';

  email = '';
  password = '';

  onLogin() {
    if (!this.email || !this.password) {
      console.log('plase fill all');
    }
    this.TaskService.loginUser(this.email, this.password).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.showError = true;
          this.showErrorMessage = res.message;
          console.log(res)
        }

        localStorage.setItem('userName', res.Data.userName);
        localStorage.setItem('user_id', res.Data.userId);
        this.Router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error during login:', err);
      },
    });
  }
}

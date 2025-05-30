import { TaskService } from './../../task.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorShowComponent } from '../../error-show/error-show.component';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, CommonModule, ErrorShowComponent, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  constructor(private TaskService: TaskService, private Router: Router) {}

  showError = false;
  showErrorMessage = '';


  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;

  isOtpScreen = false;
  otp: string[] = ['', '', '', ''];

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onRegister(): void {
    if (
      !this.fullName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.TaskService.registerUser(
      this.fullName,
      this.email,
      this.password
    ).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.showError = true;
          this.showErrorMessage = res.message;
        }

        localStorage.setItem('userName', res.Data.userName);
        localStorage.setItem('user_id', res.Data.userId);
      },
      error: (err) => {
        console.error('Error during registration:', err);
      },
    });

    this.isOtpScreen = true;
  }

  onVerify(): void {
    const enteredOtp = this.otp.join('');
    if (enteredOtp.length === 4) {
      this.TaskService.verifyOtp(this.email, enteredOtp).subscribe({
        next: (res: any) => {
          if (!res.success) {
            this.showError = true;
            this.showErrorMessage = res.message;
            console.log(res)
          }

          this.Router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error during OTP verification:', err);
        },
      });
    }
  }

  onEditEmail(): void {
    this.isOtpScreen = false;
  }

  resendOtp(): void {
    console.log('Resend OTP to', this.email);
  }

  moveToNext(index: number, event: any) {
    const input = event.target;
    if (input.value && index < 3) {
      const nextInput = document.getElementById(`otp${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  }
}

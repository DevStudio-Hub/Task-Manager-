import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
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
  if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  
  console.log('Registration submitted');
  this.isOtpScreen = true;
}

  onVerify(): void {
    const enteredOtp = this.otp.join('');
    if (enteredOtp.length === 4) {
      // Call verify API here
      console.log('OTP Verified:', enteredOtp);
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



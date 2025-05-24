import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-page.component.html',
  styleUrls: ['./logo-page.component.css']
})
export class LogoPageComponent implements OnInit {
  constructor(private router: Router) {}

  text = "Task Manager";
  displayText = "";
  currentIndex = 0;

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this.currentIndex < this.text.length) {
        this.displayText += this.text[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 6000);
  }
}

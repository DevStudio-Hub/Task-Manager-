import { NgIf } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-show',
  imports: [NgIf],
  templateUrl: './error-show.component.html',
  styleUrl: './error-show.component.css'
})
export class ErrorShowComponent {
  @Input() showMessage = ""
  @Input() showError: boolean = false;
  closeError() {
    this.showError = false
    console.log(this.showError)
    
  }
}

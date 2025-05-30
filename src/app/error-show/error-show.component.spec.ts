import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorShowComponent } from './error-show.component';

describe('ErrorShowComponent', () => {
  let component: ErrorShowComponent;
  let fixture: ComponentFixture<ErrorShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPageComponent } from './logo-page.component';

describe('LogoPageComponent', () => {
  let component: LogoPageComponent;
  let fixture: ComponentFixture<LogoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

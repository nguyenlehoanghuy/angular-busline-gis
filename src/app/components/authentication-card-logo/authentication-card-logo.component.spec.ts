import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationCardLogoComponent } from './authentication-card-logo.component';

describe('AuthenticationCardLogoComponent', () => {
  let component: AuthenticationCardLogoComponent;
  let fixture: ComponentFixture<AuthenticationCardLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationCardLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationCardLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

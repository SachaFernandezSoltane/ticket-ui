import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNavigationComponent } from './login-navigation.component';

describe('LoginNavigationComponent', () => {
  let component: LoginNavigationComponent;
  let fixture: ComponentFixture<LoginNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

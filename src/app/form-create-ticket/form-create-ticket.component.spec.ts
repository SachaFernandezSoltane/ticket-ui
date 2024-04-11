import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTicketComponent } from './form-create-ticket.component';

describe('FormCreateTicketComponent', () => {
  let component: FormCreateTicketComponent;
  let fixture: ComponentFixture<FormCreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

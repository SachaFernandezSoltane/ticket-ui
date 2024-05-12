import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketUsersComponent } from './view-ticket-users.component';

describe('ViewTicketUsersComponent', () => {
  let component: ViewTicketUsersComponent;
  let fixture: ComponentFixture<ViewTicketUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTicketUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTicketUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

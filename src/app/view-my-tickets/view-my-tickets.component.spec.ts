import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTicketsComponent } from './view-my-tickets.component';

describe('ViewMyTicketsComponent', () => {
  let component: ViewMyTicketsComponent;
  let fixture: ComponentFixture<ViewMyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

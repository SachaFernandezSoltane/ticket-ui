import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketsComponent } from './view-tickets.component';

describe('ViewTicketsComponent', () => {
  let component: ViewTicketsComponent;
  let fixture: ComponentFixture<ViewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoConfigComponent } from './evento.component';

describe('EventoConfigComponent', () => {
  let component: EventoConfigComponent;
  let fixture: ComponentFixture<EventoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

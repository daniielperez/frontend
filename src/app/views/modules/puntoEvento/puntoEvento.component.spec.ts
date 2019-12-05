import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEventoComponent } from './puntoEvento.component';

describe('PuntoEventoComponent', () => {
  let component: PuntoEventoComponent;
  let fixture: ComponentFixture<PuntoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

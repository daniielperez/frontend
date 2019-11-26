import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoVentaComponent } from './puntoVenta.component';

describe('PuntoVentaComponent', () => {
  let component: PuntoVentaComponent;
  let fixture: ComponentFixture<PuntoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

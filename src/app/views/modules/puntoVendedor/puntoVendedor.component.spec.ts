import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoVendedorComponent } from './puntoVendedor.component';

describe('PuntoVendedorComponent', () => {
  let component: PuntoVendedorComponent;
  let fixture: ComponentFixture<PuntoVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteBoletaComponent } from './loteBoleta.component';

describe('LoteBoletaComponent', () => {
  let component: LoteBoletaComponent;
  let fixture: ComponentFixture<LoteBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoteBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

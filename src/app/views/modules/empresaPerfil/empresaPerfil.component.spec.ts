import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPerfilComponent } from './empresaPerfil.component';

describe('EmpresaPerfilComponent', () => {
  let component: EmpresaPerfilComponent;
  let fixture: ComponentFixture<EmpresaPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

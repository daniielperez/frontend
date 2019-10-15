import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutsComponent } from './form-layouts.component';

describe('FormLayoutsComponent', () => {
  let component: FormLayoutsComponent;
  let fixture: ComponentFixture<FormLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

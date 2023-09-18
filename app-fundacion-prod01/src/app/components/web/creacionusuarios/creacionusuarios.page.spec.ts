import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CreacionUsuariosPage } from './creacionusuarios.page';

describe('CreacionUsuariosPage', () => {
  let component: CreacionUsuariosPage;
  let fixture: ComponentFixture<CreacionUsuariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionUsuariosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

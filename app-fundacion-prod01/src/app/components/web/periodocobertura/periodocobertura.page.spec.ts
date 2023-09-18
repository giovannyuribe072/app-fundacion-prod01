import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoCoberturaPage } from './periodocobertura.page';

describe('IntermediariosPage', () => {
  let component: PeriodoCoberturaPage;
  let fixture: ComponentFixture<PeriodoCoberturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodoCoberturaPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoCoberturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

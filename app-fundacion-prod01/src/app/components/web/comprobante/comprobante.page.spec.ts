import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprobantePage } from './comprobante.page';
 
describe('IntermediariosPage', () => {
  let component: ComprobantePage;
  let fixture: ComponentFixture<ComprobantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobantePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

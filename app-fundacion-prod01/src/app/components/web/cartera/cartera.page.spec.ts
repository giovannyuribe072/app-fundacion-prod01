import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarteraPage } from './cartera.page';
 
describe('IntermediariosPage', () => {
  let component: CarteraPage;
  let fixture: ComponentFixture<CarteraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarteraPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

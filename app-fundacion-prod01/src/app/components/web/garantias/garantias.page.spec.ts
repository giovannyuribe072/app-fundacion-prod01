import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GarantiasPage } from './garantias.page';
 
describe('IntermediariosPage', () => {
  let component: GarantiasPage;
  let fixture: ComponentFixture<GarantiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GarantiasPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

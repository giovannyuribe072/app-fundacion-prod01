import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AplicarPagosPage} from './aplicarpagos.page';
 
describe('IntermediariosPage', () => {
  let component: AplicarPagosPage;
  let fixture: ComponentFixture<AplicarPagosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AplicarPagosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicarPagosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguimientoPage} from './seguimiento.page';
 
describe('IntermediariosPage', () => {
  let component: SeguimientoPage;
  let fixture: ComponentFixture<SeguimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

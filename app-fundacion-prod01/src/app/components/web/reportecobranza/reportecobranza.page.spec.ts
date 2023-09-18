import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteCobranzaPage} from './reportecobranza.page';
 
describe('IntermediariosPage', () => {
  let component: ReporteCobranzaPage;
  let fixture: ComponentFixture<ReporteCobranzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteCobranzaPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCobranzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

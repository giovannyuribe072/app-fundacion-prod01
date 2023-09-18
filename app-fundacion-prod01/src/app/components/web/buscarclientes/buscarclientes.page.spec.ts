import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarClientesPage} from './buscarclientes.page';
 
describe('IntermediariosPage', () => {
  let component: BuscarClientesPage;
  let fixture: ComponentFixture<BuscarClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarClientesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PonerHistoriaClinicaComponent } from './poner-historia-clinica.component';

describe('PonerHistoriaClinicaComponent', () => {
  let component: PonerHistoriaClinicaComponent;
  let fixture: ComponentFixture<PonerHistoriaClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PonerHistoriaClinicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PonerHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

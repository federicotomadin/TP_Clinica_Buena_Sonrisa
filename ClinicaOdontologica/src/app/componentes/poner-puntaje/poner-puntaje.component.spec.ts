import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PonerPuntajeComponent } from './poner-puntaje.component';

describe('PonerPuntajeComponent', () => {
  let component: PonerPuntajeComponent;
  let fixture: ComponentFixture<PonerPuntajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PonerPuntajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PonerPuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirturnoComponent } from './pedirturno.component';

describe('PedirturnoComponent', () => {
  let component: PedirturnoComponent;
  let fixture: ComponentFixture<PedirturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

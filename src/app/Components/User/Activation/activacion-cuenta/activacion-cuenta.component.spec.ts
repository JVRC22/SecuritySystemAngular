import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivacionCuentaComponent } from './activacion-cuenta.component';

describe('ActivacionCuentaComponent', () => {
  let component: ActivacionCuentaComponent;
  let fixture: ComponentFixture<ActivacionCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivacionCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivacionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

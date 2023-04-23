import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInfoCuentaDrawerComponent } from './modificar-info-cuenta-drawer.component';

describe('ModificarInfoCuentaDrawerComponent', () => {
  let component: ModificarInfoCuentaDrawerComponent;
  let fixture: ComponentFixture<ModificarInfoCuentaDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarInfoCuentaDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarInfoCuentaDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

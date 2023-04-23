import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInfoUsuarioDrawerComponent } from './modificar-info-usuario-drawer.component';

describe('ModificarInfoUsuarioDrawerComponent', () => {
  let component: ModificarInfoUsuarioDrawerComponent;
  let fixture: ComponentFixture<ModificarInfoUsuarioDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarInfoUsuarioDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarInfoUsuarioDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

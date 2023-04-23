import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTiendaModalComponent } from './modificar-tienda-modal.component';

describe('ModificarTiendaModalComponent', () => {
  let component: ModificarTiendaModalComponent;
  let fixture: ComponentFixture<ModificarTiendaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTiendaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTiendaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

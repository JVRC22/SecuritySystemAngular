import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarModeradorDrawerComponent } from './modificar-moderador-drawer.component';

describe('ModificarModeradorDrawerComponent', () => {
  let component: ModificarModeradorDrawerComponent;
  let fixture: ComponentFixture<ModificarModeradorDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarModeradorDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarModeradorDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

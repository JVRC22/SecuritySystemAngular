import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTiendaDrawerComponent } from './add-tienda-drawer.component';

describe('AddTiendaDrawerComponent', () => {
  let component: AddTiendaDrawerComponent;
  let fixture: ComponentFixture<AddTiendaDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTiendaDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTiendaDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

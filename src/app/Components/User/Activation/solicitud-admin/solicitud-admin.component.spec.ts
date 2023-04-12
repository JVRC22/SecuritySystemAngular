import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAdminComponent } from './solicitud-admin.component';

describe('SolicitudAdminComponent', () => {
  let component: SolicitudAdminComponent;
  let fixture: ComponentFixture<SolicitudAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

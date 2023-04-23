import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarInvitadosDrawerComponent } from './administrar-invitados-drawer.component';

describe('AdministrarInvitadosDrawerComponent', () => {
  let component: AdministrarInvitadosDrawerComponent;
  let fixture: ComponentFixture<AdministrarInvitadosDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarInvitadosDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarInvitadosDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

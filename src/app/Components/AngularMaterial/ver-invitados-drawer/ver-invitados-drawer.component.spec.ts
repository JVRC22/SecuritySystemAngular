import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInvitadosDrawerComponent } from './ver-invitados-drawer.component';

describe('VerInvitadosDrawerComponent', () => {
  let component: VerInvitadosDrawerComponent;
  let fixture: ComponentFixture<VerInvitadosDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerInvitadosDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInvitadosDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

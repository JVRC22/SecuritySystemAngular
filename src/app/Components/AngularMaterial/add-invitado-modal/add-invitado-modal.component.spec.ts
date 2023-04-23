import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvitadoModalComponent } from './add-invitado-modal.component';

describe('AddInvitadoModalComponent', () => {
  let component: AddInvitadoModalComponent;
  let fixture: ComponentFixture<AddInvitadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvitadoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvitadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

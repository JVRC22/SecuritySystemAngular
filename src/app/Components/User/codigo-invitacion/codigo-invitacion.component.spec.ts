import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoInvitacionComponent } from './codigo-invitacion.component';

describe('CodigoInvitacionComponent', () => {
  let component: CodigoInvitacionComponent;
  let fixture: ComponentFixture<CodigoInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoInvitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

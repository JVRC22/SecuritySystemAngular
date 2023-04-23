import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeradorDrawerComponent } from './add-moderador-drawer.component';

describe('AddModeradorDrawerComponent', () => {
  let component: AddModeradorDrawerComponent;
  let fixture: ComponentFixture<AddModeradorDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModeradorDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModeradorDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

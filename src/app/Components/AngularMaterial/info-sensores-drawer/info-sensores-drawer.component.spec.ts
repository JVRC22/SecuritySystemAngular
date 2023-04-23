import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSensoresDrawerComponent } from './info-sensores-drawer.component';

describe('InfoSensoresDrawerComponent', () => {
  let component: InfoSensoresDrawerComponent;
  let fixture: ComponentFixture<InfoSensoresDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSensoresDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSensoresDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

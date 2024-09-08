import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainUserComponent } from './plain-user.component';

describe('PlainUserComponent', () => {
  let component: PlainUserComponent;
  let fixture: ComponentFixture<PlainUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

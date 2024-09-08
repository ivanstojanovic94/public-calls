import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCustomFormComponent } from './application-custom-form.component';

describe('IzvestajiComponent', () => {
  let component: ApplicationCustomFormComponent;
  let fixture: ComponentFixture<ApplicationCustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCustomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

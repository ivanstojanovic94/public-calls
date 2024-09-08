import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentApplicationsComponent } from './sent-applications.component';

describe('SentApplicationsComponent', () => {
  let component: SentApplicationsComponent;
  let fixture: ComponentFixture<SentApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

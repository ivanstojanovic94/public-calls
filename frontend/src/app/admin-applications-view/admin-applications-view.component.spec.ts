import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationsViewComponent } from './admin-applications-view.component';

describe('AdminApplicationsViewComponent', () => {
  let component: AdminApplicationsViewComponent;
  let fixture: ComponentFixture<AdminApplicationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicationsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

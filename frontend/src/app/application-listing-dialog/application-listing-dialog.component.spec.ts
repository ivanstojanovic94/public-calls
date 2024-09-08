import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListingDialogComponent } from './application-listing-dialog.component';

describe('ApplicationListingDialogComponent', () => {
  let component: ApplicationListingDialogComponent;
  let fixture: ComponentFixture<ApplicationListingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationListingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

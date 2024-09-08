
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { PlainUserComponent } from './plain-user/plain-user.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RegisterComponent, RegistrationConfirmation } from './register/register.component'; 
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';

import {MatIconModule} from '@angular/material/icon'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogOverviewExampleDialog } from './admin/dialog.example';
import {ApplicationCustomFormComponent } from './application-custom-form/application-custom-form.component';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatRadioModule} from '@angular/material/radio';
import { ConfirmationDialog, ConfirmationDialogDraft, DeclineDialog, DialogsComponent } from './dialogs/dialogs.component';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { AccountComponent } from './account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DraftsComponent } from './drafts/drafts.component';
import { SentApplicationsComponent } from './sent-applications/sent-applications.component';
import { AdminApplicationsViewComponent } from './admin-applications-view/admin-applications-view.component';
import { ApplicationListingDialogComponent } from './application-listing-dialog/application-listing-dialog.component';
import {MatChipsModule} from '@angular/material/chips'; 
import {ScrollingModule} from '@angular/cdk/scrolling';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ListboxModule} from 'primeng/listbox';
import { AdminRegistrationComponent, TemplateConfirmationDialog } from './admin-registration/admin-registration.component';
import { ReportsComponent } from './reports/reports.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report1Component } from './report1/report1.component';









 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlainUserComponent,
    AdminComponent,
    RegisterComponent,
    DialogOverviewExampleDialog,
    ApplicationCustomFormComponent,
    DialogsComponent,
    ConfirmationDialog,
    DeclineDialog,
    AccountComponent,
    NotificationsComponent,
    DraftsComponent,
    ConfirmationDialogDraft,
    SentApplicationsComponent,
    AdminApplicationsViewComponent,
    ApplicationListingDialogComponent,
    AdminRegistrationComponent,
    TemplateConfirmationDialog,
    RegistrationConfirmation,
    ReportsComponent,
    Report2Component,
    Report3Component,
    Report1Component
    
    
    

  
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatMenuModule,
    MatToolbarModule,
    MatChipsModule,
    ScrollingModule,
    VirtualScrollerModule,
    ListboxModule,
    MatTableExporterModule,
    NgxChartsModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

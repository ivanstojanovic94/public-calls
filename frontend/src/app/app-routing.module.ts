import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { ApplicationCustomFormComponent } from './application-custom-form/application-custom-form.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PlainUserComponent } from './plain-user/plain-user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'plainUser', component:PlainUserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'applicationForm', component: ApplicationCustomFormComponent},
  {path: 'applicationForm/plainUser', component: PlainUserComponent},
  {path: 'account', component: AccountComponent},
  {path: 'notifications', component: NotificationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

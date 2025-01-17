import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';  
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventEditComponent } from './event-edit/edit-event.component';
import { EventFormComponent } from './pages/organiser_dashboard/event-form/event-form.component';
import { EventListComponent } from './pages/organiser_dashboard/event-list/event-list.component';
import { OrgDashboardComponent } from './pages/organiser_dashboard/org-dashboard/org-dashboard.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventEditComponent,
    EventFormComponent,
    EventListComponent,
    OrgDashboardComponent,
    ReservationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ExamplesModule,
    AdminDashboardModule,  // Import AdminDashboardModule
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

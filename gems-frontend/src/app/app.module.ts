import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module'; // Correct import path
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventEditComponent } from './event-edit/edit-event.component';
import { EventFormComponent } from './pages/organiser_dashboard/event-form/event-form.component';
import { OrgDashboardComponent } from './pages/organiser_dashboard/org-dashboard/org-dashboard.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { OverlayComponent } from './pages/overlay/overlay.component';
import { EventsComponent } from './pages/events/events.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SharedModule } from './shared/shared.module'; // Correct import path
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventEditComponent,
    EventFormComponent,
    OrgDashboardComponent,
    ReservationComponent,
    LoginComponent,
    RegisterComponent,
    OverlayComponent,
    EventsComponent,
    LandingComponent,
    ReservationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ExamplesModule,
    AdminDashboardModule,  // Import AdminDashboardModule
    HttpClientModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    ComponentsModule,
    SharedModule,  // Import SharedModule
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }) // Configure ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

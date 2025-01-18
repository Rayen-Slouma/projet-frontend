import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
<<<<<<< HEAD
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ViewEventComponent } from './components/view-event/view-event.component';
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
    ViewEventComponent,
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
=======
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EventsComponent } from './pages/events/events.component';
import { OverlayComponent } from './pages/overlay/overlay.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LandingComponent,
        EventsComponent,

        OverlayComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        HttpClientModule,
        NgbCarouselModule
    ],
    providers: [],
    bootstrap: [AppComponent]
>>>>>>> landingpage+events+search
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './auth/login/login.component'; 
import { ProfileComponent } from './examples/profile/profile.component';  // from 'examples'
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EventsComponent } from './pages/events/events.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/edit-event.component'; 
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminEventListComponent } from './admin-dashboard/admin-event-list/admin-event-list.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { OrgDashboardComponent } from './pages/organiser_dashboard/org-dashboard/org-dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventCreationComponent } from './components/event-creation/event-creation.component';
// Existing routes
const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'events', component: EventsComponent },
    { path: 'view-event/:id', component: ViewEventComponent },
    { path: 'dashboard', component: OrgDashboardComponent },
    // Admin Dashboard and user-related routes
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
            { path: 'users', component: UserListComponent },
            { path: 'events', component: AdminEventListComponent },
            { path: '', redirectTo: 'users', pathMatch: 'full' }, 
        ],
    },
    {
        path: 'organiser-dashboard/create-event',
        component: EventCreationComponent
    },

    // Other important routes
    { path: 'user/:id', component: UserProfileComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'event/:id', component: EventDetailsComponent, children: [
        { path: 'edit', component: EventEditComponent },
    ]},
    { path: '**', redirectTo: 'user-profile' },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }

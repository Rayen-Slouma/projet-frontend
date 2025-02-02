import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
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

// Import Auth Guard
import { AuthGuard } from './guards/auth.guard';

// Define Routes
const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'examples/profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'events', component: EventsComponent , canActivate: [AuthGuard] },
    { path: 'view-event/:id', component: ViewEventComponent , canActivate: [AuthGuard]},
    { path: 'dashboard', component: OrgDashboardComponent, canActivate: [AuthGuard] },
    
    // Admin Dashboard (Protected)
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard], // Protect entire admin dashboard
        children: [
            { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
            { path: 'events', component: AdminEventListComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'users', pathMatch: 'full' },
        ],
    },

    // Organiser Dashboard (Protected)
    {
        path: 'organiser-dashboard/create-event',
        component: EventCreationComponent,
        canActivate: [AuthGuard]
    },

    // Other protected routes
    { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },
    {
        path: 'event/:id',
        component: EventDetailsComponent,
        canActivate: [AuthGuard], 
        children: [
            { path: 'edit', component: EventEditComponent, canActivate: [AuthGuard] },
        ],
    },
    
    { path: '**', redirectTo: '' },
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

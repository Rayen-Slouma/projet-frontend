import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// Import des composants existants
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { EventFormComponent } from './pages/organiser_dashboard/event-form/event-form.component';
import { EventListComponent } from './pages/organiser_dashboard/event-list/event-list.component';
import { OrgDashboardComponent } from './pages/organiser_dashboard/org-dashboard/org-dashboard.component';

// Import des nouveaux composants du dashboard
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/edit-event.component'; // Import du composant d'édition
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminEventListComponent } from './admin-dashboard/admin-event-list/admin-event-list.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'user/:id', component: UserProfileComponent }, 
    { path: 'edit/:id', component: EventEditComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'dashboard',     component: OrgDashboardComponent },
    {
        path: 'event/:id',
        component: EventDetailsComponent,
        children: [
            { path: 'edit', component: EventEditComponent }, // Route pour éditer un événement
        ],
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
            { path: 'users', component: UserListComponent },
            { path: 'events', component: AdminEventListComponent },
            { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirect to users by default
        ],
    },
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

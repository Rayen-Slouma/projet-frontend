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
import { EventCreationComponent } from './components/event-creation/event-creation.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

// Import des nouveaux composants du dashboard
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { EventListComponent } from './admin-dashboard/event-list/event-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/edit-event.component'; // Import du composant d'édition
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    {
        path: 'event/:id',
        component: EventDetailsComponent,
        children: [
            { path: 'edit', component: EventEditComponent }, // Route pour éditer un événement
        ],
    },
    { path: 'create-event', component: EventCreationComponent }, // Add your event route here
    { path: 'view-event', component: ViewEventComponent }, // Add this route

    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
   
    { path: 'user/:id', component: UserProfileComponent }, 
    { path: 'edit/:id', component: EventEditComponent },
    { path: 'edit-profile/:id', component: EditProfileComponent }, // Nouvelle route
    { path: '**', redirectTo: 'user-profile' },
   
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
            { path: 'users', component: UserListComponent },
            { path: 'events', component: EventListComponent },
            { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirect to users by default
        ],
    },
    { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
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

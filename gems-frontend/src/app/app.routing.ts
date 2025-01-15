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

// Import des nouveaux composants du dashboard
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { EventListComponent } from './admin-dashboard/event-list/event-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'examples/landing', component: LandingComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },

    // Routes pour le tableau de bord admin
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'admin-dashboard/users', component: UserListComponent },
    { path: 'admin-dashboard/events', component: EventListComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }

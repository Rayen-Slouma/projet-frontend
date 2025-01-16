import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';  
import { EventEditComponent } from './event-edit/edit-event.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ViewEventComponent,
        EventEditComponent,


    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        NgxSliderModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ExamplesModule,
        AdminDashboardModule,  // Import AdminDashboardModule
    HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]


})
export class AppModule {}

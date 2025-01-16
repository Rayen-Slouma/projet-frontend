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

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ViewEventComponent,
        

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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

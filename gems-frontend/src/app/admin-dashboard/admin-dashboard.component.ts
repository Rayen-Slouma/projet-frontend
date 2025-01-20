import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../pages/organiser_dashboard/service/event.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ 
        transform: 'translateX(0)',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
      })),
      state('out', style({ 
        transform: 'translateX(0)',
        width: '60%',
        marginLeft: '0',
        marginRight: 'auto'
      })),
      transition('in => out', [
        animate('0.8s ease-in-out')
      ]),
      transition('out => in', [
        animate('0.8s ease-in-out')
      ])
    ]),
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'translateX(100%)'
        }),
        animate('0.8s ease-in-out', 
          style({ 
            opacity: 1, 
            transform: 'translateX(0)'
          })
        )
      ]),
      transition(':leave', [
        animate('0.8s ease-in-out', 
          style({ 
            opacity: 0, 
            transform: 'translateX(100%)'
          })
        )
      ])
    ])
  ]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  data: Date = new Date(); // Current date for footer copyright
  showForm = false;
  selectedEventId: number = null;
  private eventSubscription: Subscription;
  isAdmin: boolean;

  constructor(public router: Router, private eventService: EventService, private authService: AuthService) { }

  ngOnInit() {
    // Add specific body or navbar class modifications here if needed
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.isAdmin = this.authService.getUserInfoFromToken()?.username === 'admin';
    this.subscribeToEvents();
  }

  ngOnDestroy() {
    // Clean up classes when leaving the page
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  private subscribeToEvents(): void {
    this.eventSubscription = this.eventService.getEventObservable()
      .subscribe(event => {
        // If the same event is clicked again, just trigger undisplay
        if (this.selectedEventId === event.id) {
          this.undisplayForm();
          this.selectedEventId = null;
          return;
        }

        // If it's a different event
        if (this.showForm) {
          // Trigger undisplay first
          this.showForm = false;
          setTimeout(() => {
            this.selectedEventId = event.id;
            this.showForm = true;
          }, 800); // Wait for undisplay animation to complete
        } else {
          this.selectedEventId = event.id;
          this.showForm = true;
        }
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  undisplayForm(): void {
    this.showForm = false;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.scss'],
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
export class OrgDashboardComponent implements OnInit, OnDestroy {
  images = [
    'assets/img/header.jpg',
    'assets/img/bg1.jpg',
    'assets/img/bg3.jpg',
    'assets/img/bg4.jpg',
    'assets/img/bg5.jpg',
    'assets/img/bg6.jpg',
    'assets/img/bg7.jpg',
    'assets/img/bg8.jpg',
    'assets/img/bg11.jpg'
  ];
  currentImageIndex = 0;
  showForm = false;
  selectedEventId: number = null;
  private eventSubscription: Subscription;
  organizer: string;
  userId: number;

  constructor(private eventService: EventService, private authService: AuthService) { }

  ngOnInit(): void {
    this.startSlideshow();
    this.subscribeToEvents();
    this.organizer = this.authService.getUserInfoFromToken()?.username || 'Organiser';
    this.userId = this.authService.getUserInfoFromToken()?.sub;
  }

  ngOnDestroy(): void {
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

  startSlideshow(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000); // Change image every 5 seconds
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  undisplayForm(): void {
    this.showForm = false;
  }
}

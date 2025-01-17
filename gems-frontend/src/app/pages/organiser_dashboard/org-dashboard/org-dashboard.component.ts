import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventListComponent } from '../event-list/event-list.component';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';

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
  private eventSubscription: Subscription;
  private selectedEvent: any = null;
  private currentEventId: number = null;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.startSlideshow();
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
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
    this.selectedEvent = null;
  }

  addEvent(): void {
    // Logic to add a new event
    console.log('Add new event');
  }

  private subscribeToEvents(): void {
    this.eventSubscription = this.eventService.getEventObservable()
      .subscribe(event => {
        console.log('Received event in dashboard:', event);
        
        // If the same event is clicked again, just undisplay
        if (this.selectedEvent && this.selectedEvent === event) {
          this.undisplayForm();
          return;
        }

        if (this.showForm) {
          // If form is already shown, trigger undisplay first
          this.showForm = false;
          setTimeout(() => {
            this.selectedEvent = event;
            this.showForm = true;
          }, 800); // Wait for undisplay animation to complete (matches animation duration)
        } else {
          this.selectedEvent = event;
          this.showForm = true;
        }
      });
  }
}

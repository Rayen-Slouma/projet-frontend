import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventService } from '../../pages/organiser_dashboard/service/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css'],
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
export class AdminEventListComponent implements OnInit, OnDestroy {
  events: any[] = [];
  private apiUrl = 'http://localhost:3000/events';
  showForm = false;
  selectedEventId: number = null;
  private eventSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  loadEvents(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }

  viewEvent(eventId: number): void {
    this.router.navigate([`/view-event/${eventId}`]);
  }

  editEvent(event: any): void {
    this.eventService.setEditingEvent(event);
  }

  deleteEvent(event: any): void {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cet événement ?');
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${event.id}`).subscribe(
        () => {
          console.log(`Événement avec l'ID ${event.id} supprimé.`);
          this.loadEvents(); // Recharger la liste des événements après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l’événement:', error);
        }
      );
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

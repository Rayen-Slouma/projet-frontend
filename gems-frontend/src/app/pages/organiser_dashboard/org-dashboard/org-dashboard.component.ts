import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventListComponent } from '../event-list/event-list.component';

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
export class OrgDashboardComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
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

  addEvent(): void {
    // Logic to add a new event
    console.log('Add new event');
  }
}

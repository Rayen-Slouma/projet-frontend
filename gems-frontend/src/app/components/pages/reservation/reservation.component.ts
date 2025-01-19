import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  seats: number[] = [];
  reservedSeats: number[] = [];
  showSeatSelector = false;
  reservationForm = {
    seatNumber: '',
    paymentMethod: ''
  };
  eventId: string;
  userId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      this.userId = params['userId'];
      console.log('Event ID:', this.eventId);
      console.log('User ID:', this.userId);
      this.fetchEventDetails();
    });
  }

  fetchEventDetails(): void {
    this.http.get<any>(`http://localhost:3000/events/${this.eventId}`).subscribe({
      next: (event) => {
        console.log('Event Details:', event);
        this.seats = Array(event.ticketLimit).fill(0).map((_, i) => i + 1);
        console.log('All Seats:', this.seats);
        this.fetchReservedSeats();
      },
      error: (err) => console.error('Error fetching event details:', err),
    });
  }

  fetchReservedSeats(): void {
    this.http.get<any[]>(`http://localhost:3000/reservations/event/${this.eventId}/seats`).subscribe({
      next: (reservedSeats: any[]) => {
        console.log('Reserved Seats:', reservedSeats);
        this.reservedSeats = reservedSeats.map(seat => parseInt(seat, 10)); // Convert to integers
        console.log('Reserved Seats:', this.reservedSeats);
      },
      error: (err) => console.error('Error fetching reserved seats:', err),
    });
  }

  toggleSeatSelector() {
    this.showSeatSelector = !this.showSeatSelector;
  }

  selectSeat(seat: number) {
    if (!this.reservedSeats.includes(seat)) {
      this.reservationForm.seatNumber = seat.toString();
      this.showSeatSelector = false;
    }
  }

  onSubmit() {
    const reservationData = {
      userId: this.userId,
      eventId: this.eventId,
      reservationDate: new Date(),
      seatNumber: parseInt(this.reservationForm.seatNumber, 10), // Ensure seat number is an integer
      paymentMethod: this.reservationForm.paymentMethod
    };

    this.http.post('http://localhost:3000/reservations', reservationData).subscribe({
      next: () => {
        this.toastr.success('Reservation successful!', 'Success');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Error making reservation:', err);
        this.toastr.error('Failed to make reservation. Please try again.', 'Error');
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    seats: number[] = Array(40).fill(0).map((_, i) => i + 1);
    showSeatSelector = false;
    reservationForm = {
        name: '',
        email: '',
        seatNumber: '',
        paymentMethod: '',
        phone: ''
    };

    constructor() { }

    ngOnInit() { }

    toggleSeatSelector() {
        this.showSeatSelector = !this.showSeatSelector;
    }

    selectSeat(seat: number) {
        this.reservationForm.seatNumber = seat.toString();
        this.showSeatSelector = false;
    }

    onSubmit() {
        console.log('Form submitted:', this.reservationForm);
    }
}
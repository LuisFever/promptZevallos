import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './booking.html',
    styles: []
})
export class BookingComponent {
    steps = ['Fecha', 'Evento', 'Datos'];
    currentStep = 1;

    dates = Array.from({ length: 31 }, (_, i) => i + 1); // Mock calendar days
}

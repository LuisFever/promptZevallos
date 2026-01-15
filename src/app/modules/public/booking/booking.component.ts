import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './booking.html',
    styles: []
})
export class BookingComponent {
    steps = ['Fecha', 'Evento', 'Datos'];
    currentStep = 1;
    showSuccessModal = false;

    dates = Array.from({ length: 31 }, (_, i) => i + 1); // Mock calendar days

    // Form Model
    formData = {
        date: null as number | null,
        name: '',
        lastname: '',
        email: '',
        comments: '',
        eventType: 'Social'
    };

    constructor(private dataService: DataService, private router: Router) { }

    submit() {
        // Simular Reserva
        this.dataService.addTransaction({
            id: Date.now(),
            concept: `Reserva Web (Día ${this.formData.date}) - ${this.formData.name} ${this.formData.lastname}`,
            type: 'Ingreso',
            amount: 0, // Pendiente de cotización
            category: 'Reservas',
            date: new Date().toLocaleTimeString(),
            method: 'Web',
            status: 'Pendiente'
        });

        this.showSuccessModal = true;
    }

    closeModal() {
        this.showSuccessModal = false;
        this.router.navigate(['/']);
    }
}

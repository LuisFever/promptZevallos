import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContractComponent } from './contract.component';
import { DataService, Booking } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, ContractComponent, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {
  // Datos para el calendario
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  bookings: Booking[] = [];
  showContract = false;
  showNewModal = false;
  showDetailModal = false;
  selectedBooking: Booking | null = null;

  newBooking: any = { clientName: '', eventName: '', date: 1, time: '09:00', total: 0, status: 'Pendiente' };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.bookings$.subscribe(data => {
      this.bookings = data;
    });
  }

  getBookingsForDay(day: number): Booking[] {
    return this.bookings.filter(b => b.date === day);
  }

  // --- ACTIONS ---

  openNewModal() { this.showNewModal = true; }
  closeNewModal() { this.showNewModal = false; }

  saveBooking() {
    const b: Booking = {
      id: Date.now(),
      clientName: this.newBooking.clientName,
      eventName: this.newBooking.eventName,
      date: this.newBooking.date,
      time: this.newBooking.time,
      total: this.newBooking.total,
      status: 'Pendiente' // Default
    };
    this.dataService.addBooking(b);
    this.closeNewModal();
    this.newBooking = { clientName: '', eventName: '', date: 1, time: '09:00', total: 0, status: 'Pendiente' };
  }

  openDetailModal(b: Booking) {
    this.selectedBooking = b;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedBooking = null;
  }

  updateStatus(status: 'Confirmado' | 'Pendiente' | 'En Curso') {
    if (this.selectedBooking) {
      const updated = { ...this.selectedBooking, status };
      this.dataService.updateBooking(updated);
    }
    this.closeDetailModal();
  }

  openContract(b?: Booking) {
    // If called from calendar directly or from detail modal
    if (b) this.selectedBooking = b;
    this.showContract = true;
  }

  closeContract() {
    this.showContract = false;
    this.selectedBooking = null;
  }
}


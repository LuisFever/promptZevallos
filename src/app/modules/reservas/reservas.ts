import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContractComponent } from './contract.component';

@Component({
  selector: 'app-reservas',
  imports: [CommonModule, ContractComponent],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas {
  // Datos para el calendario
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  diasMes = Array.from({ length: 31 }, (_, i) => i + 1);

  showContract = false;

  openContract() {
    this.showContract = true;
  }

  closeContract() {
    this.showContract = false;
  }
}


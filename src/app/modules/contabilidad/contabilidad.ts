import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contabilidad.html'
})
export class Contabilidad {
  selectedEvent = 'Global';

  eventos = [
    { id: 'Global', nombre: 'Reporte Anual Consolidado' },
    { id: 'ev1', nombre: 'Boda Familia Flores' },
    { id: 'ev2', nombre: 'Conferencia Tech' }
  ];

  // Datos Simulados
  private dataGlobal = {
    ingreso: 145280, inversion: 42100, margen: 68.4,
    reportes: [
      { mes: 'Ene', ingresos: 15000, color: 'h-[60%]' },
      { mes: 'Feb', ingresos: 18000, color: 'h-[75%]' },
      { mes: 'Mar', ingresos: 12000, color: 'h-[50%]' },
      { mes: 'Abr', ingresos: 22000, color: 'h-[95%]' }
    ]
  };

  private dataEvento1 = {
    ingreso: 12000, inversion: 4500, margen: 62.5,
    reportes: [
      { mes: 'Reserva', ingresos: 6000, color: 'h-[50%]' },
      { mes: 'Final', ingresos: 6000, color: 'h-[50%]' }
    ]
  };

  get stats() {
    if (this.selectedEvent === 'ev1') return this.dataEvento1;
    // Default Global
    return this.dataGlobal;
  }

  topServicios = [
    { nombre: 'Alquiler Salón Imperial', ventas: 24, tendencia: 'up' },
    { nombre: 'Servicio de Catering', ventas: 18, tendencia: 'up' },
    { nombre: 'Derecho de Corcho', ventas: 45, tendencia: 'down' }
  ];
}
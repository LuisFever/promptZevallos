import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contabilidad.html'
})
export class Contabilidad {
  // Datos estadísticos anuales simulados
  reportes = [
    { mes: 'Ene', ingresos: 15000, egresos: 8000, color: 'h-[60%]' },
    { mes: 'Feb', ingresos: 18000, egresos: 9000, color: 'h-[75%]' },
    { mes: 'Mar', ingresos: 12000, egresos: 7500, color: 'h-[50%]' },
    { mes: 'Abr', ingresos: 22000, egresos: 11000, color: 'h-[95%]' },
  ];

  topServicios = [
    { nombre: 'Alquiler Salón Imperial', ventas: 24, tendencia: 'up' },
    { nombre: 'Servicio de Catering', ventas: 18, tendencia: 'up' },
    { nombre: 'Derecho de Corcho', ventas: 45, tendencia: 'down' }
  ];
}
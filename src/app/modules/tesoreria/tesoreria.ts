import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tesoreria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tesoreria.html',
  styles: []
})
export class Tesoreria {
  // Datos simulados incluyendo personal
  movimientos = [
    { id: 1, concepto: 'Venta POS - Evento Corporativo', tipo: 'Ingreso', monto: 1250.00, categoria: 'Ventas', fecha: 'Hoy 10:30 AM', metodo: 'Efectivo' },
    { id: 2, concepto: 'Pago 04 Mozos - Boda Flores', tipo: 'Egreso', monto: 320.00, categoria: 'Planilla Eventos', fecha: 'Hoy 09:15 AM', metodo: 'Efectivo' },
    { id: 3, concepto: 'Sueldo Mensual - Administrador', tipo: 'Egreso', monto: 2500.00, categoria: 'Sueldos Fijos', fecha: '10 Ene 2026', metodo: 'Transferencia' },
    { id: 4, concepto: 'Reserva Boda Fam. Ruiz', tipo: 'Ingreso', monto: 5000.00, categoria: 'Reservas', fecha: 'Ayer', metodo: 'Banco' },
    { id: 5, concepto: 'Pago Personal Limpieza (Mensual)', tipo: 'Egreso', monto: 1200.00, categoria: 'Sueldos Fijos', fecha: '05 Ene 2026', metodo: 'Transferencia' }
  ];

  saldoCaja = 4130.00;
}
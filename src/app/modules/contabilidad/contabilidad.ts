import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Transaction } from '../../services/data.service';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contabilidad.html'
})
export class Contabilidad implements OnInit {
  selectedEvent = 'Global';
  eventos = [
    { id: 'Global', nombre: 'Reporte Anual Consolidado' },
    { id: 'ev1', nombre: 'Boda Familia Flores' },
    { id: 'ev2', nombre: 'Conferencia Tech' }
  ];

  transactions: Transaction[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.transactions$.subscribe(data => {
      this.transactions = data;
    });
  }

  get stats() {
    // Filter by event if needed (For now, 'Global' uses all, specific events could filter by Concept string matches)
    // Simplified logic: Global = All Data.

    const ingreso = this.transactions
      .filter(t => t.type === 'Ingreso')
      .reduce((sum, t) => sum + t.amount, 0);

    const inversion = this.transactions
      .filter(t => t.type === 'Egreso')
      .reduce((sum, t) => sum + t.amount, 0);

    const margen = ingreso > 0 ? ((ingreso - inversion) / ingreso) * 100 : 0;

    return {
      ingreso,
      inversion,
      margen: margen.toFixed(1),
      reportes: [
        { mes: 'Ene', ingresos: 15000, color: 'h-[60%]' },
        { mes: 'Feb', ingresos: 18000, color: 'h-[75%]' },
        // ... simple mock chart data for now
      ]
    };
  }

  topServicios: any[] = [
    { nombre: 'Alquiler Salón Imperial', ventas: 24, tendencia: 'up', total: 12000 },
    { nombre: 'Servicio de Catering', ventas: 18, tendencia: 'up', total: 8500 },
    { nombre: 'Derecho de Corcho', ventas: 45, tendencia: 'down', total: 2000 }
  ];

  downloadReport() {
    window.print();
  }
}
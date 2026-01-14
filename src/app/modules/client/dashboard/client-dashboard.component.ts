import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-client-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './client-dashboard.html',
    styles: []
})
export class ClientDashboardComponent {
    promociones = [
        { titulo: 'Descuento Cumpleañero', desc: '20% OFF en salones por tu mes', color: 'bg-purple-500' },
        { titulo: 'Pack Corporativo', desc: 'Proyector + Audio Gratis', color: 'bg-indigo-500' }
    ];

    reservas = [
        { fecha: '12 Nov 2025', evento: 'Boda Civil', estado: 'Confirmado', statusColor: 'text-emerald-500' },
        { fecha: '05 Ene 2026', evento: 'Workshop', estado: 'Pendiente', statusColor: 'text-amber-500' }
    ];
}

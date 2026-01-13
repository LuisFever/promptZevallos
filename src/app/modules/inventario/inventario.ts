import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.html',
  styles: []
})
export class Inventario {
  categorias = ['Bienes Consumibles', 'Mobiliario', 'Equipos Audiovisuales'];
  
  items = [
    { id: 1, nombre: 'Silla Tiffany Blanca', stock: 150, min: 140, estado: 'Ok', cat: 'Mobiliario' },
    { id: 2, nombre: 'Cerveza Personal (Caja)', stock: 5, min: 10, estado: 'Crítico', cat: 'Bienes Consumibles' },
    { id: 3, nombre: 'Proyector Epson 4K', stock: 2, min: 1, estado: 'Ok', cat: 'Equipos Audiovisuales' },
    { id: 4, nombre: 'Agua Mineral (Pack 12)', stock: 8, min: 15, estado: 'Bajo', cat: 'Bienes Consumibles' }
  ];
}
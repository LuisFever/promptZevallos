import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pos.html',
  styles: []
})
export class Pos {
  categorias = ['Bebidas', 'Snacks', 'Servicios', 'Otros'];
  
  // Simulación de productos
  productos = [
    { id: 1, nombre: 'Agua Mineral', precio: 3.50, stock: 45, icon: '💧' },
    { id: 2, nombre: 'Cerveza Personal', precio: 8.00, stock: 120, icon: '🍺' },
    { id: 3, nombre: 'Gaseosa 500ml', precio: 4.50, stock: 80, icon: '🥤' },
    { id: 4, nombre: 'Piqueo Familiar', precio: 15.00, stock: 20, icon: '🍟' },
    { id: 5, nombre: 'Descorche', precio: 25.00, stock: 99, icon: '🍾' },
    { id: 6, nombre: 'Hielo Bolsa', precio: 10.00, stock: 15, icon: '❄️' },
  ];
}
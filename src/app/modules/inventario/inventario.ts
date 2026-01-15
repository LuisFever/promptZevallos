import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Product } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styles: []
})
export class Inventario implements OnInit {
  categorias = ['Bienes Consumibles', 'Alimentos', 'Bebidas', 'Licores', 'Mobiliario', 'Equipos Audiovisuales'];
  items: Product[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.products$.subscribe(data => {
      this.items = data;
    });
  }

  // Helper para estado visual (Simulado por ahora ya que Product no tiene 'min')
  getStatus(stock: number): string {
    if (stock <= 5) return 'Crítico';
    if (stock <= 20) return 'Bajo';
    return 'Ok';
  }

  getStatusColor(stock: number): string {
    if (stock <= 5) return 'text-rose-500 bg-rose-50';
    if (stock <= 20) return 'text-amber-500 bg-amber-50';
    return 'text-emerald-500 bg-emerald-50';
  }

  updateStock(item: Product, change: number) {
    // Simular venta/compra rápida
    this.dataService.updateStock(item.id, -change); // updateStock resta, por ende -change suma
  }
}
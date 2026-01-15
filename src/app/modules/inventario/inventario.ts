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

  selectedCategory = 'Todas las categorías';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.products$.subscribe(data => {
      this.items = data;
    });
  }

  get filteredItems(): Product[] {
    if (this.selectedCategory === 'Todas las categorías') {
      return this.items;
    }
    return this.items.filter(i => i.category === this.selectedCategory);
  }

  get criticalStock(): number {
    return this.items.filter(i => i.stock <= 5).length;
  }

  get lowStock(): number {
    return this.items.filter(i => i.stock > 5 && i.stock <= 20).length;
  }

  get totalItems(): number {
    return this.items.length;
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

  // Modal & Form State
  showModal = false;
  newItem: any = { name: '', category: 'Bienes Consumibles', price: 0, stock: 0, icon: '📦' };

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveItem() {
    if (this.newItem.id) {
      // Edit
      this.dataService.updateProduct(this.newItem);
    } else {
      // Create
      const p: Product = {
        id: Date.now(),
        name: this.newItem.name,
        category: this.newItem.category,
        price: this.newItem.price,
        stock: this.newItem.stock,
        icon: this.newItem.icon || '📦'
      };
      this.dataService.addProduct(p);
    }
    this.closeModal();
    this.newItem = { name: '', category: 'Bienes Consumibles', price: 0, stock: 0, icon: '📦' };
  }

  editItem(item: Product) {
    this.newItem = { ...item };
    this.showModal = true;
  }

  deleteItem(item: Product) {
    if (confirm(`¿Eliminar ${item.name} del inventario?`)) {
      this.dataService.deleteProduct(item.id);
    }
  }

  updateStock(item: Product, change: number) {
    // Simular venta/compra rápida
    this.dataService.updateStock(item.id, -change); // updateStock resta, por ende -change suma
  }
}
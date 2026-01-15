import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Product, Transaction } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.html',
  styles: []
})
export class Pos implements OnInit {
  categorias = ['Bebidas', 'Alimentos', 'Licores', 'Otros'];
  products: Product[] = [];
  cart: { product: Product, quantity: number }[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.products$.subscribe(data => {
      this.products = data;
    });
  }

  addToCart(p: Product) {
    if (p.stock <= 0) {
      alert('Sin Stock!');
      return;
    }
    const existing = this.cart.find(item => item.product.id === p.id);
    if (existing) {
      if (existing.quantity >= p.stock) {
        alert('No hay suficiente stock');
        return;
      }
      existing.quantity++;
    } else {
      this.cart.push({ product: p, quantity: 1 });
    }
  }

  get total(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  checkout() {
    if (this.cart.length === 0) return;

    // 1. Update Stock
    this.cart.forEach(item => {
      this.dataService.updateStock(item.product.id, item.quantity);
    });

    // 2. Add Transaction (Ingreso)
    const t: Transaction = {
      id: Date.now(),
      concept: 'Venta POS - ' + this.cart.map(i => `${i.quantity} ${i.product.name}`).join(', '),
      type: 'Ingreso',
      amount: this.total,
      category: 'Ventas',
      date: new Date().toLocaleTimeString(),
      method: 'Efectivo',
      status: 'Completado'
    };
    this.dataService.addTransaction(t);

    // 3. Clear Cart
    this.cart = [];
    alert('Venta Registrada con Éxito');
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffPaymentComponent } from './staff-payment.component';
import { DataService, Transaction } from '../../services/data.service';

@Component({
  selector: 'app-tesoreria',
  standalone: true,
  imports: [CommonModule, StaffPaymentComponent],
  templateUrl: './tesoreria.html',
  styles: []
})
export class Tesoreria implements OnInit {
  showPaymentModal = false;
  movimientos: Transaction[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.transactions$.subscribe(data => {
      this.movimientos = data;
    });
  }

  get saldoCaja(): number {
    // Simple calculation: Ingreso - Egreso
    return this.movimientos.reduce((acc, curr) => {
      return curr.type === 'Ingreso' ? acc + curr.amount : acc - curr.amount;
    }, 0);
  }

  addTransaction(t: any) {
    // The modal emits a partial object, we need to ensure it fits Transaction interface
    // But DataService expects a Transaction.
    // Ideally StaffPaymentComponent should emit a compatible object or we construct it here.
    // Assuming staff-payment emits a simplified object, let's adapt it or pass it if compatible.

    // In staff-payment.ts:
    // confirm.emit({ concepto: ..., categoria: ..., metodo: ..., monto: ..., tipo: 'Egreso', fecha: ..., estado: ... });
    // It matches the structure mostly but ID is missing.

    const newTransaction: Transaction = {
      id: Date.now(),
      concept: t.concepto,
      type: t.tipo,
      amount: t.monto,
      category: t.categoria,
      date: t.fecha,
      method: t.metodo,
      status: t.estado
    };

    this.dataService.addTransaction(newTransaction);
    this.showPaymentModal = false;
  }
}
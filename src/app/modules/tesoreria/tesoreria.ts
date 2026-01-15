import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffPaymentComponent } from './staff-payment.component';
import { DataService, Transaction } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tesoreria',
  standalone: true,
  imports: [CommonModule, StaffPaymentComponent, FormsModule],
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

  // General Transaction Modal
  showTxModal = false;
  newTx: any = { concept: '', amount: 0, type: 'Egreso', category: 'General' };

  openTxModal() { this.showTxModal = true; }
  closeTxModal() { this.showTxModal = false; }

  saveTx() {
    const t: Transaction = {
      id: Date.now(),
      concept: this.newTx.concept,
      type: this.newTx.type,
      amount: this.newTx.amount,
      category: this.newTx.category,
      date: new Date().toLocaleTimeString(),
      method: 'Efectivo',
      status: 'Procesado'
    };
    this.dataService.addTransaction(t);
    this.closeTxModal();
    this.newTx = { concept: '', amount: 0, type: 'Egreso', category: 'General' };
  }
}
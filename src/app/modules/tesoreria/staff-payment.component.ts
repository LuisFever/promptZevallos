import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-staff-payment',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-fadeIn">
        <h2 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <span>💸</span> Registrar Pago de Personal
        </h2>
        
        <div class="space-y-5">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Colaborador</label>
                <select [(ngModel)]="collaborator" class="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                    <option value="Juan Perez">Juan Perez (Mozo)</option>
                    <option value="Maria Gomez">Maria Gomez (Cocina)</option>
                    <option value="Carlos Ruiz">Carlos Ruiz (Seguridad)</option>
                    <option value="Ana Diaz">Ana Diaz (Limpieza)</option>
                </select>
            </div>
            
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Contexto del Pago</label>
                <select [(ngModel)]="event" class="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                    <option value="Boda Familia Flores">Boda Familia Flores (Eventual)</option>
                    <option value="Conferencia Tech">Conferencia Tech (Eventual)</option>
                    <option value="Mensual">Pago de Planilla Mensual</option>
                    <option value="Adelanto">Adelanto de Sueldo</option>
                </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Monto (S/)</label>
                     <div class="relative">
                        <span class="absolute left-3 top-3 text-slate-400 font-bold">S/</span>
                        <input type="number" [(ngModel)]="amount" class="w-full pl-8 p-3 bg-slate-50 rounded-xl border border-slate-200 font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                     </div>
                </div>
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Método</label>
                     <select [(ngModel)]="method" class="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition">
                        <option value="Efectivo">Efectivo 💵</option>
                        <option value="Yape/Plin">Yape/Plin 📱</option>
                        <option value="Transferencia">Transferencia 🏦</option>
                     </select>
                </div>
            </div>
        </div>

        <div class="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button (click)="cancel.emit()" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition">Cancelar</button>
            <button (click)="save()" class="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 transform active:scale-95">
                Registrar Egreso
            </button>
        </div>
      </div>
    </div>
  `
})
export class StaffPaymentComponent {
    collaborator = 'Juan Perez';
    event = 'Boda Familia Flores';
    amount = 150;
    method = 'Efectivo';

    @Output() cancel = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<any>();

    save() {
        this.confirm.emit({
            concepto: `Pago a ${this.collaborator} (${this.event})`,
            categoria: this.event === 'Mensual' ? 'Planilla' : 'Sueldos Eventuales',
            metodo: this.method,
            monto: this.amount,
            tipo: 'Egreso',
            fecha: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
            estado: 'Procesado'
        });
    }
}

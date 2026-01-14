import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 print:p-0 print:bg-white print:static">
      <div id="printable-contract" class="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-12 print:shadow-none print:w-full print:max-w-none">
        
        <!-- Header del Contrato -->
        <div class="text-center mb-8 border-b border-gray-200 pb-6">
          <h1 class="text-2xl font-black uppercase tracking-widest text-slate-900 mb-2">Contrato de Servicios</h1>
          <p class="text-sm text-slate-500 font-serif italic">Centro de Convenciones Villa Zevallos</p>
          <p class="text-xs text-slate-400 mt-1">RUC: 20123456789 • Av. Mario Zevallos N°006 – Tacllán</p>
        </div>

        <!-- Cuerpo Legal -->
        <div class="space-y-6 text-justify text-sm leading-relaxed text-slate-700 font-serif">
          <p>
            Conste por el presente documento, el contrato de arrendamiento de local y servicios que celebran de una parte 
            <strong>VILLA ZEVALLOS</strong>, en adelante EL PROVEEDOR, y de la otra parte <strong>{{clientName}}</strong> 
            identificado con DNI/RUC <strong>{{clientId}}</strong>, en adelante EL CLIENTE.
          </p>

          <h3 class="font-bold uppercase text-xs tracking-wider mt-6 mb-2">PRIMERO: Objeto</h3>
          <p>
            EL PROVEEDOR se compromete a ceder el uso de sus instalaciones para la realización del evento denominado 
            <strong>"{{eventName}}"</strong> a realizarse el día <strong>{{eventDate}}</strong>.
          </p>

          <h3 class="font-bold uppercase text-xs tracking-wider mt-6 mb-2">SEGUNDO: Costos y Forma de Pago</h3>
          <p>
            El costo total acordado es de <strong>S/ {{totalAmount}}</strong>. EL CLIENTE abona en este acto el 50% como garantía 
            de reserva, debiendo cancelar el saldo restante 48 horas antes del evento.
          </p>

          <h3 class="font-bold uppercase text-xs tracking-wider mt-6 mb-2">TERCERO: Condiciones de Uso</h3>
          <p>
            EL CLIENTE se hace responsable por cualquier daño a la infraestructura. Está prohibido el ingreso de pirotecnia 
            y materiales inflamables. El horario límite del evento es hasta las 02:00 AM.
          </p>
        </div>

        <!-- Firmas -->
        <div class="grid grid-cols-2 gap-20 mt-24 pt-12">
          <div class="text-center border-t border-slate-300 pt-4">
            <p class="font-bold text-slate-900 text-xs uppercase">Por Villa Zevallos</p>
            <p class="text-[10px] text-slate-400">Jhimy Shuan • Administrador</p>
          </div>
          <div class="text-center border-t border-slate-300 pt-4">
            <p class="font-bold text-slate-900 text-xs uppercase">Por El Cliente</p>
            <p class="text-[10px] text-slate-400">{{clientName}}</p>
          </div>
        </div>

        <!-- Botones de Acción (No imprimir) -->
        <div class="mt-12 flex justify-end gap-3 print:hidden border-t border-slate-100 pt-6">
            <button (click)="close()" class="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition">Cerrar</button>
            <button (click)="print()" class="px-6 py-2 rounded-xl font-bold text-white bg-indigo-900 hover:bg-indigo-800 transition shadow-lg flex items-center gap-2">
                <span>🖨️</span> Imprimir / Guardar PDF
            </button>
        </div>

      </div>
    </div>
  `
})
export class ContractComponent {
  @Input() clientName: string = 'Juan Pérez';
  @Input() clientId: string = '10445566771';
  @Input() eventName: string = 'Boda Civil';
  @Input() eventDate: string = '12 de Noviembre, 2026';
  @Input() totalAmount: string = '4,500.00';

  @Input() closeCallback: () => void = () => { };

  close() {
    this.closeCallback();
  }

  print() {
    window.print();
  }
}

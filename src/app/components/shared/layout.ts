import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], // Importante para que funcione el menú
  templateUrl: './layout.html'
})
export class LayoutComponent {
  userEmail: string = '';
  userRole: string = '';

  constructor() {
    // Leer sesión (simulado)
    if (typeof localStorage !== 'undefined') {
      this.userEmail = localStorage.getItem('userEmail') || 'Usuario';
      this.userRole = localStorage.getItem('userRole') || 'ADMINISTRADOR';
    }
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    }
    // Redirigir usando window.location para forzar recarga y limpiar estado en memoria
    window.location.href = '/login';
  }

  canAccess(module: string): boolean {
    if (this.userRole === 'ADMINISTRADOR') return true;

    switch (module) {
      case 'ADMIN': return this.userRole === 'ADMINISTRADOR' || this.userRole === 'SEGURIDAD';
      case 'COMERCIAL': return this.userRole === 'VENTAS';
      case 'RESERVAS': return this.userRole === 'VENTAS';
      case 'POS': return this.userRole === 'VENTAS' || this.userRole === 'FINANZAS';
      case 'INVENTARIO': return this.userRole === 'LOGISTICA';
      case 'TESORERIA': return this.userRole === 'FINANZAS';
      case 'CONTABILIDAD': return this.userRole === 'FINANZAS';
      default: return false;
    }
  }
}
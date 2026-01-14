// src/app/modules/admin/admin.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  initials: string;
  name: string;
  email: string;
  role: string;
  roleColor: string; // Tailwind class for badge
  status: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styles: []
})
export class AdminComponent {
  users: User[] = [
    {
      initials: 'JZ',
      name: 'Admin Zevallos',
      email: 'admin@villazevallos.com',
      role: 'Administrador',
      roleColor: 'bg-indigo-100 text-indigo-700',
      status: 'Activo'
    },
    {
      initials: 'FC',
      name: 'María Finanzas',
      email: 'finanzas@villazevallos.com',
      role: 'Finanzas',
      roleColor: 'bg-emerald-100 text-emerald-700',
      status: 'Activo'
    },
    {
      initials: 'LG',
      name: 'Operador Logístico',
      email: 'logistica@villazevallos.com',
      role: 'Logística',
      roleColor: 'bg-slate-100 text-slate-700',
      status: 'Inactivo'
    },
    {
      initials: 'VT',
      name: 'Ejecutivo de Ventas',
      email: 'ventas@villazevallos.com',
      role: 'Ventas',
      roleColor: 'bg-amber-100 text-amber-700',
      status: 'Activo'
    },
    {
      initials: 'SG',
      name: 'Jefe de Seguridad',
      email: 'seguridad@villazevallos.com',
      role: 'Seguridad',
      roleColor: 'bg-red-100 text-red-700',
      status: 'Activo'
    }
  ];
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styles: []
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  // Form New User
  showModal = false;
  newUser: any = { name: '', email: '', role: 'Ventas' };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.users$.subscribe(data => {
      this.users = data;
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveUser() {
    const roleColors: any = {
      'Administrador': 'bg-indigo-100 text-indigo-700',
      'Ventas': 'bg-emerald-100 text-emerald-700',
      'Finanzas': 'bg-amber-100 text-amber-700',
      'Logística': 'bg-blue-100 text-blue-700',
      'Seguridad': 'bg-slate-100 text-slate-700'
    };

    const u: User = {
      id: Date.now(),
      name: this.newUser.name,
      email: this.newUser.email,
      role: this.newUser.role,
      roleColor: roleColors[this.newUser.role] || 'bg-gray-100',
      status: 'Activo'
    };

    this.dataService.addUser(u);
    this.closeModal();
    this.newUser = { name: '', email: '', role: 'Ventas' }; // Reset
  }
}

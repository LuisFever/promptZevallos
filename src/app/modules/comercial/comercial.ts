import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Service } from '../../services/data.service';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comercial.html'
})
export class Comercial implements OnInit {
  servicios: Service[] = [];
  showModal = false;
  editingService: Service = { id: 0, titulo: '', capacidad: '', precio: 0, imagen: '', tags: [] };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.services$.subscribe(data => {
      this.servicios = data;
    });
  }

  editService(s: Service) {
    this.editingService = { ...s }; // Clone
    this.showModal = true;
  }

  saveService() {
    this.dataService.updateService(this.editingService);
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }
}
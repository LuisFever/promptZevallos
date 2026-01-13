import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comercial.html'
})
export class Comercial {
  servicios = [
    { 
      titulo: 'Salón Imperial', 
      capacidad: '500 personas', 
      precio: 'S/ 3,500', 
      imagen: '🏛️', 
      tags: ['Aire Acondicionado', 'Sonido Pro'] 
    },
    { 
      titulo: 'Jardín de Recepciones', 
      capacidad: '300 personas', 
      precio: 'S/ 2,800', 
      imagen: '🌳', 
      tags: ['Outdoor', 'Iluminación LED'] 
    },
    { 
      titulo: 'Paquete Boda Todo Incluido', 
      capacidad: 'Personalizado', 
      precio: 'Desde S/ 8,000', 
      imagen: '💍', 
      tags: ['Catering', 'Decoración', 'DJ'] 
    }
  ];
}
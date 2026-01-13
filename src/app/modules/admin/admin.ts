// src/app/modules/admin/admin.ts
import { Component } from '@angular/core'; // <--- ESTO ES LO QUE FALTA

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.html',
  styles: [] // Cambiamos styleUrl por styles: [] para que no busque el .css que falta
})
export class AdminComponent {}
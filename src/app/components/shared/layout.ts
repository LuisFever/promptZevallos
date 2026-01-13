import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Importante para que funcione el menú
  templateUrl: './layout.html'
})
export class LayoutComponent {}
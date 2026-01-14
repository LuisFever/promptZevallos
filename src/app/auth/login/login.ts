import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: [] // Sin archivos CSS externos para evitar errores
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    // Simulación de delay de red
    setTimeout(() => {
      this.loading = false;

      // Lógica de Roles Simulada
      let role = '';

      if (this.email === 'admin@villazevallos.com') {
        role = 'ADMINISTRADOR';
        this.router.navigate(['/admin']);
      } else if (this.email.includes('ventas')) {
        role = 'VENTAS';
        this.router.navigate(['/admin']);
      } else if (this.email.includes('finanzas')) {
        role = 'FINANZAS';
        this.router.navigate(['/admin']);
      } else if (this.email.includes('logistica')) {
        role = 'LOGISTICA';
        this.router.navigate(['/admin']);
      } else if (this.email.includes('seguridad')) {
        role = 'SEGURIDAD';
        this.router.navigate(['/admin']);
      } else if (this.email === 'cliente@gmail.com') {
        role = 'CLIENTE';
        this.router.navigate(['/cliente/dashboard']);
      } else if (this.email.includes('@villazevallos.com')) {
        // Fallback para otros correos corporativos
        role = 'ADMINISTRADOR';
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = 'Credenciales inválidas. Prueba con: admin, ventas, finanzas, logistica o seguridad (@villazevallos.com)';
        return;
      }

      // Guardar sesión simulada
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', this.email);
    }, 1500);
  }
}

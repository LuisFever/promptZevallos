import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { LayoutComponent } from './components/shared/layout';
import { PublicLayoutComponent } from './components/shared/public-layout/public-layout.component';
import { LandingComponent } from './modules/public/landing/landing.component';

export const routes: Routes = [
  // RUTA PÚBLICA (Landing Page)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingComponent }
    ]
  },

  // RUTA DE AUTENTICACIÓN (Login) - Fuera de ambos layouts
  { path: 'login', component: LoginComponent },

  // RUTA PRIVADA (Admin Panel)
  {
    path: '', // Esto permite que /admin cargue bajo el layout privado
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadComponent: () => import('./modules/admin/admin').then(m => m.AdminComponent)
      },
      {
        path: 'comercial',
        loadComponent: () => import('./modules/comercial/comercial').then(m => m.Comercial)
      },
      {
        path: 'reservas',
        loadComponent: () => import('./modules/reservas/reservas').then(m => m.Reservas)
      },
      {
        path: 'pos',
        loadComponent: () => import('./modules/pos/pos').then(m => m.Pos)
      },
      {
        path: 'inventario',
        loadComponent: () => import('./modules/inventario/inventario').then(m => m.Inventario)
      },
      {
        path: 'tesoreria',
        loadComponent: () => import('./modules/tesoreria/tesoreria').then(m => m.Tesoreria)
      },
      {
        path: 'contabilidad',
        loadComponent: () => import('./modules/contabilidad/contabilidad').then(m => m.Contabilidad)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { LayoutComponent } from './components/shared/layout';

export const routes: Routes = [
  // Cambié 'AdminComponent' por 'LoginComponent' para que el login sea lo primero
  { path: 'login', component: LoginComponent }, 
  {
    path: '',
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
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
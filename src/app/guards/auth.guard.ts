import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // 1. Permitir renderizado en el Servidor (SSR)
    // Esto evita que el servidor redirija antes de que el cliente (navegador) tenga oportunidad de verificar el localStorage.
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    // 2. Verificación en el Cliente (Navegador)
    if (typeof localStorage !== 'undefined') {
        const userRole = localStorage.getItem('userRole');
        if (userRole) {
            return true; // Acceso permitido
        }
    }

    // 3. Fallback: No autorizado
    router.navigate(['/login']);
    return false;
};

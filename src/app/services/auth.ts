import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
verifyLogin() {
throw new Error('Method not implemented.');
}
    logado = signal(false);
    
    private platformId = inject(PLATFORM_ID);

    setClient(nome: string) {
        localStorage.setItem('nome', nome);
    }

    getClient() {
        const usuario = localStorage.getItem('usuario');

        if (!usuario) {
            return null;
        }

        return JSON.parse(usuario);
    }

    login() {
        this.logado.set(true);
        localStorage.setItem('logado', 'true');
        localStorage.setItem('nome', '');
    }

    logout() {
        this.logado.set(false);
        localStorage.removeItem('logado');
        localStorage.removeItem('nome');
    }

    verificarLogin() {
        return localStorage.getItem('logado') === 'true';
    }
}

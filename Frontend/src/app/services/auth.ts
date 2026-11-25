import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    logado = signal(false);
    
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

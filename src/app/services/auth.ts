import { Injectable } from '@angular/core';
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
        return localStorage.getItem('nome') ?? '';
    }

    login() {
        this.logado.set(true);
        localStorage.setItem('logado', 'true');
        localStorage.setItem('nome', 'Usuário');
    }

    logout() {
        this.logado.set(false);
        localStorage.removeItem('logado');
    }

    verificarLogin() {
        return localStorage.getItem('logado') === 'true';
    }
}

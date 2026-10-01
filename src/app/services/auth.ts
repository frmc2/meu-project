import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly logado = signal(false);

    private readonly platformId = inject(PLATFORM_ID);

    private get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    setClient(nome: string) {
        if (this.isBrowser) {
            localStorage.setItem('nome', nome);
        }
    }

    getClient() {
        return this.isBrowser ? localStorage.getItem('nome') ?? '' : '';
    }

    login() {
        this.logado.set(true);

        if (this.isBrowser) {
            localStorage.setItem('logado', 'true');
            localStorage.setItem('nome', 'Usuário');
        }
    }

    logout() {
        this.logado.set(false);

        if (this.isBrowser) {
            localStorage.removeItem('logado');
        }
    }

    verificarLogin() {
        return this.isBrowser && localStorage.getItem('logado') === 'true';
    }
}

import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  email = '';
  senha = '';
  erro = '';
  statusRedirecionamento = '';

  public readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private redirecionamentoTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.auth.verificarLogin()) {
      void this.router.navigateByUrl('/perfil');
    }
  }

  ngOnDestroy(): void {
    if (this.redirecionamentoTimer) {
      clearTimeout(this.redirecionamentoTimer);
    }
  }

  login() {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      this.erro = 'Usuário não encontrado.';
      return;
    }

    let usuario: { nome?: string; email?: string; senha?: string };
    try {
      usuario = JSON.parse(usuarioSalvo);
    } catch {
      this.erro = 'Os dados cadastrados estão inválidos. Faça o cadastro novamente.';
      return;
    }

    if (
      usuario.email?.trim().toLowerCase() === this.email.trim().toLowerCase() &&
      usuario.senha === this.senha
    ) {
      console.log('Login realizado!');

      // indica que o usuário está logado
      this.auth.login();
      this.auth.setClient(usuario.nome ?? 'Usuário');

      this.email = '';
      this.senha = '';
      this.erro = '';
      this.agendarRedirecionamento('Login realizado. Redirecionando para seu perfil...');
    } else {
      this.erro = 'E-mail ou senha incorretos.';
    }
  }

  private agendarRedirecionamento(mensagem: string): void {
    if (this.redirecionamentoTimer) {
      clearTimeout(this.redirecionamentoTimer);
    }

    this.statusRedirecionamento = mensagem;
    this.redirecionamentoTimer = setTimeout(() => {
      void this.router.navigateByUrl('/perfil');
    }, 2500);
  }
}

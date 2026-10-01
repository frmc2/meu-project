import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  erro = '';
  auth = inject(AuthService);

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

      // aqui você pode navegar para outra página
    } else {
      this.erro = 'E-mail ou senha incorretos.';
    }
  }
}

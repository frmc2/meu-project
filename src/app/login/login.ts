import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
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

    const usuario = JSON.parse(usuarioSalvo);

    if (
      usuario.email === this.email &&
      usuario.senha === this.senha
    ) {
      console.log('Login realizado!');

      // indica que o usuário está logado
      this.auth.login();
      this.auth.setClient(usuario.nome);

      this.erro = '';

      // aqui você pode navegar para outra página
    } else {
      this.erro = 'E-mail ou senha incorretos.';
    }
  }
}

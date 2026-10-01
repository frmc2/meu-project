import { Component } from '@angular/core';

@Component({
  selector: 'app-esqueci-senha',
  imports: [],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css',
})
export class EsqueciSenha {
  email = '';
  novaSenha = '';

  mensagem = '';
  erro = '';

  verificarEmail() {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      this.erro = 'Nenhum usuário cadastrado.';
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if (usuario.email !== this.email) {
      this.erro = 'E-mail não encontrado.';
      return;
    }

    this.erro = '';
    this.mensagem = 'E-mail encontrado. Digite sua nova senha.';
  }

  alterarSenha() {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    usuario.senha = this.novaSenha;

    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.mensagem = 'Senha alterada com sucesso!';
  }
}
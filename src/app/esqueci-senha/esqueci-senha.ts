import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidadorService } from '../services/validador';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  imports: [FormsModule, RouterLink],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css',
})
export class EsqueciSenha {

  email = '';
  novaSenha = '';

  mensagem = '';
  erro = '';

  constructor(private validadorService: ValidadorService) {}

  verificarEmail() {

    // VALIDAÇÃO DO E-MAIL
    if (!this.validadorService.validarEmail(this.email)) {
      this.erro = 'Digite um e-mail válido.';
      this.mensagem = '';
      return;
    }

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

    // VALIDAÇÃO DA SENHA
    if (!this.validadorService.validarSenha(this.novaSenha)) {
      this.erro = 'A senha deve possuir pelo menos 6 caracteres.';
      this.mensagem = '';
      return;
    }

    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo) {
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    usuario.senha = this.novaSenha;

    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.erro = '';
    this.mensagem = 'Senha alterada com sucesso!';
  }
}

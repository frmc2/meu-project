import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidadorService } from '../services/validador';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  nome = '';
  sobrenome = '';
  cpf = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mensagem = '';
  erro = '';

  constructor(
    private ValidadorService: ValidadorService
  ) {}

  cadastrar() {

    // VALIDA CPF
    if (!this.ValidadorService.validarCpf(this.cpf)) {
      this.erro = 'CPF inválido.';
      this.mensagem = '';
      return;
    }

    // VALIDA E-MAIL
    if (!this.ValidadorService.validarEmail(this.email)) {
      this.erro = 'Digite um e-mail válido.';
      this.mensagem = '';
      return;
    }

    // VALIDA SENHA
    if (!this.ValidadorService.validarSenha(this.senha)) {
      this.erro = 'A senha deve possuir pelo menos 6 caracteres.';
      this.mensagem = '';
      return;
    }

    // SEU CÓDIGO ORIGINAL
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      this.mensagem = '';
      return;
    }

    const usuario = {
      nome: this.nome.trim(),
      sobrenome: this.sobrenome.trim(),
      cpf: this.cpf.trim(),
      email: this.email.trim().toLowerCase(),
      senha: this.senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log("Usuário Cadastrado ");

    this.nome = '';
    this.sobrenome = '';
    this.cpf = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.erro = '';
    this.mensagem = 'Cadastro realizado. Agora você pode entrar com seu e-mail e senha.';
  }
}

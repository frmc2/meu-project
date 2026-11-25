import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  validarEmail(email: string): boolean {
    if (!email) {
      return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email.trim());
  }


  validarCpf(cpf: string): boolean {
    if (!cpf) {
      return false;
    }

    // Remove pontos e hífen
    const valor = cpf.replace(/\D/g, '');

    // CPF precisa ter 11 dígitos
    if (valor.length !== 11) {
      return false;
    }

    // Rejeita CPFs com todos os números iguais
    if (/^(\d)\1{10}$/.test(valor)) {
      return false;
    }

    // Primeiro dígito verificador
    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += Number(valor[i]) * (10 - i);
    }

    let resto = soma % 11;
    const digito1 = resto < 2 ? 0 : 11 - resto;

    if (digito1 !== Number(valor[9])) {
      return false;
    }

    // Segundo dígito verificador
    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += Number(valor[i]) * (11 - i);
    }

    resto = soma % 11;
    const digito2 = resto < 2 ? 0 : 11 - resto;

    return digito2 === Number(valor[10]);
  }


  validarSenha(senha: string): boolean {
    if (!senha) {
      return false;
    }

    return senha.length >= 6;
  }
}

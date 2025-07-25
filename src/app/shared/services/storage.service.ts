import { Injectable } from '@angular/core';

const JWT_TOKEN = '_token';
const USUARIO = '_usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private prefix = '_credito-app-v1';

  constructor() {
  }

  private getStorage(chave: string) {
    const retorno = localStorage.getItem(this.prefix + chave);
    if (retorno) {
      return JSON.parse(retorno);
    }
    return null;
  }

  private setStorage(chave: string, data: any) {
    localStorage.setItem(this.prefix + chave, JSON.stringify(data));
  }

  setToken(token: string) {
    this.setStorage(JWT_TOKEN, token);
  }

  getToken() {
    return this.getStorage(JWT_TOKEN);
  }

  clearToken() {
    localStorage.removeItem(this.prefix + JWT_TOKEN);
  }

  setUsuario(usuario: any) {
    this.setStorage(USUARIO, usuario);
  }

  getUsuario() {
    return this.getStorage(USUARIO);
  }

  clearUsuario() {
    this.clearToken();
    localStorage.removeItem(this.prefix + USUARIO);
  }
}

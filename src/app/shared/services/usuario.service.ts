import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends AbstractService<Usuario> {

  constructor(protected httpClient: HttpClient) {
    super('usuarios', httpClient);
  }
}

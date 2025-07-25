import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends AbstractService<any> {

  constructor(protected httpClient: HttpClient) {
    super('usuarios', httpClient);
  }

  listar() {
    return this.getAll();
  }

  buscar(page: number, limit: number) {
    return this.getAllBy({page, limit}, 'paginado');
  }

  detalhe(id: string) {
    return this.getById(id);
  }

  criar(usuario: any) {
    return this.post(usuario);
  }

  editar(id: string, usuario: any) {
    return this.put(usuario, id);
  }

  deletar(id: string) {
    return this.delete(id);
  }

  aceitarTermo(id: string) {
    return this.patch({}, id, 'aceitar-termo');
  }

  me(): Observable<any> {
    return this.getOne('me');
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService<any> {
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);
  usuario$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
  ) {
    super('auth', inject(HttpClient));
  }

  entrar(auth: { email: string, senha: string }) {
    return this.post(auth).pipe(
      tap((retorno: AuthResponse) => {
        this.storageService.setToken(retorno.token);
        this.storageService.setUsuario(retorno.usuario);
        this.usuario$.next(retorno.usuario);
      }),
    );
  }

  isLoggedIn(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getToken()) {
      this.router.navigate(['/creditos'], {replaceUrl: true});
      return false;
    }
    return true;
  }

  isLoggedOut(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.storageService.getToken()) {
      this.router.navigate(['/login'], {replaceUrl: true});
      return false;
    }
    return true;
  }

  isPerfilIn(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data: { perfis: string[] } = next.data as { perfis: string[] };
    const usuario = this.storageService.getUsuario();
    if (data && !data.perfis.includes(usuario.perfil)) {
      this.router.navigate(['/creditos'], {replaceUrl: true});
      return false;
    }
    return true;
  }
}

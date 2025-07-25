import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService<any> {
  usuario$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    protected httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    super('auth', httpClient);
  }

  entrar(auth: any) {
    return this.post(auth).pipe(
      tap((retorno: any) => {
        this.storageService.setToken(retorno.access_token);
        this.storageService.setUsuario(retorno.usuario);
        this.usuario$.next(retorno.usuario);
      }),
    );
  }

  isLoggedIn(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getToken()) {
      this.router.navigate(['/classe-psicofarmaco'], {replaceUrl: true});
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
      this.router.navigate(['/classe-psicofarmaco'], {replaceUrl: true});
      return false;
    }
    return true;
  }

  limparUsuario() {
    this.storageService.clearUsuario();
  }
}

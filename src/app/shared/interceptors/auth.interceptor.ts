import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { inject as injectApp } from '../utils/inject.util';

export function loggingInterceptor(this: any, req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> {
  if (req.url.indexOf('auth') !== -1) {
    return next(req);
  }
  const token = inject(StorageService).getToken();
  if (!token) {
    return next(req);
  }
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });
  return next(reqWithHeader).pipe(
    catchError(async (response) => {
      if (response.error?.statusCode === 401 || response.status === 403) {
        const storageService: StorageService = await injectApp(StorageService);
        const toastController: ToastController = await injectApp(ToastController);
        const toast = await toastController.create({
          message: 'Sessão expirada, por favor, realize login novamente.',
          duration: 3000,
          position: 'top',
          color: 'dark',
        });
        storageService.clearUsuario();
        const router: Router = await injectApp(Router);
        router.navigate(['/login']);
        await toast.present();
      }
      return throwError(response);
    })
  );
}


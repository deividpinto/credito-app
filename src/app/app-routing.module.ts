import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { posAuthGuard } from './shared/guards/pos-auth.guard';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'creditos',
    pathMatch: 'full'
  },
  {
    path: 'creditos',
    loadChildren: () => import('./creditos/creditos.module').then(m => m.CreditosPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [posAuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

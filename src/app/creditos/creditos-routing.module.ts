import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditosPage } from './creditos.page';

const routes: Routes = [
  {
    path: '',
    component: CreditosPage
  },
  {
    path: 'credito/:numeroCredito',
    loadChildren: () => import('./credito/credito.module').then( m => m.CreditoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditosPageRoutingModule {}

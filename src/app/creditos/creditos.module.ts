import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreditosPageRoutingModule } from './creditos-routing.module';
import { CreditosPage } from './creditos.page';
import { SkeletonModule } from '../shared/components/skeleton/skeleton.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CreditosPageRoutingModule,
		SkeletonModule
	],
  declarations: [CreditosPage]
})
export class CreditosPageModule {}

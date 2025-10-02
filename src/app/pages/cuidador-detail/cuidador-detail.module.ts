import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadorDetailPageRoutingModule } from './cuidador-detail-routing.module';

import { CuidadorDetailPage } from './cuidador-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadorDetailPageRoutingModule
  ],
  declarations: [CuidadorDetailPage]
})
export class CuidadorDetailPageModule {}

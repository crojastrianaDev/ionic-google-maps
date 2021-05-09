import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMarkerPageRoutingModule } from './new-marker-routing.module';

import { NewMarkerPage } from './new-marker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMarkerPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewMarkerPage],
})
export class NewMarkerPageModule {}

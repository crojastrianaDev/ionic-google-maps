import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMarkerPage } from './new-marker.page';

const routes: Routes = [
  {
    path: '',
    component: NewMarkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMarkerPageRoutingModule {}

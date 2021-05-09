import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { SedeService } from '../sede.service';
import { Sede } from '../app/sede';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-marker',
  templateUrl: './new-marker.page.html',
  styleUrls: ['./new-marker.page.scss'],
})
export class NewMarkerPage implements OnInit {
  @Input() latitud: any;
  @Input() longitud: any;
  addMarker: FormGroup;
  isSubmited = false;
  sede: Sede;

  constructor(
    private modalController: ModalController,
    private sedeService: SedeService,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}
  async mostrarMensaje(mensaje) {
    const toas = await this.toastController.create({
      message: mensaje,
      duration: 2500,
    });
    toas.present();
  }
  guardar() {
    this.isSubmited = true;
    if (!this.addMarker.valid) {
      this.mostrarMensaje('Diligencia el formulario por completo');
      // console.log(this.addMarker.value);
    } else {
      this.sede = this.addMarker.value;
      this.sedeService.addSede(this.sede).subscribe((sede) => {
        this.mostrarMensaje('Marker almacenado');
        sede = null;
        this.addMarker.reset();
        this.regresar();
      });
    }
  }
  regresar(): void {
    this.router.navigate(['tabs/tab1']);
  }
  ngOnInit() {
    // console.log(`${this.latitud}-${this.longitud}`);
    this.createForm();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  private createForm() {
    this.addMarker = this.formBuilder.group({
      nombre: ['', Validators.required],
      latitud: [`${this.latitud}`, Validators.required],
      longitud: [`${this.longitud}`, Validators.required],
    });
  }
}

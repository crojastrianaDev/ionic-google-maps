import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sede } from '../app/sede';
import { SedeService } from '../sede.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewMarkerPage } from '../new-marker/new-marker.page';

declare var google;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  //@ViewChild('map', { static: false }) mapRef: ElementRef;
  map: any;
  myLocationIcon = {
    path:
      'M11 11l1.256 5 3.744-10-10 3.75 5 1.25zm1-11c-5.522 0-10 4.395-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.42-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8 8 3.582 8 8-3.581 8-8 8z',
    scale: 1,
    fillColor: '#3a84df',
  };

  sedes: Sede[] = [];
  constructor(
    private geolocation: Geolocation,
    private sedeService: SedeService,
    private router: Router,
    private modalC: ModalController
  ) {}

  ngOnInit() {}
  getSedes(): void {
    this.sedeService.getSedes().subscribe((sedes) => {
      this.sedes = sedes;
      this.sedes.forEach((element) => {
        console.log(element);
        const marcador = new google.maps.LatLng(
          element.latitud,
          element.longitud
        );
        this.agregarMarcadores(
          marcador,
          this.map,
          element.nombre,
          false,
          google.maps.Animation.BOUNCE,
          iconBase + 'hospitals.png'
        );
      });
    });
  }

  addMarker() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp.coords.latitude);
        // resp.coords.latitude
        // resp.coords.longitude
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  newMarker() {
    this.map.addListener('click', (e) => {
      // alert(e.latLng.lat() + ';' + e.latLng.lng());
      const lat = e.latLng.lat();
      const lon = e.latLng.lng();
      this.presentModal(lat, lon);
    });
  }

  ionViewDidEnter() {
    this.loadMap();
    this.getSedes();
    this.addMarker();
    this.newMarker();
  }
  async presentModal(lat: any, lon: any) {
    const modal = await this.modalC.create({
      component: NewMarkerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        latitud: lat,
        longitud: lon,
      },
    });
    return await modal.present();
  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = { lat: 2.43823, lng: -76.61316 };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
      this.agregarMarcadores(
        myLatLng,
        this.map,
        'Ciudad de popayán',
        true,
        google.maps.Animation.DROP,
        iconBase + 'target.png'
      );
      this.obtenerPosicion(this.map);
    });
  }
  agregarMarcadores(posicion, mapa, titulo, dragable, animacion, icon) {
    const opcionesMarcador = {
      position: posicion,
      draggable: dragable,
      amimation: animacion,
      map: mapa,
      title: titulo,
      icon: icon,
    };
    var marca = new google.maps.Marker(opcionesMarcador);
    return marca;
  }
  obtenerPosicion(mapa) {
    this.geolocation
      .getCurrentPosition()
      .then((response) => {
        const actual = new google.maps.LatLng(
          response.coords.latitude,
          response.coords.longitude
        );

        this.agregarMarcadores(
          actual,
          this.map,
          'Mi posición',
          false,
          google.maps.Animation.BOUNCE,
          this.myLocationIcon
        );
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}

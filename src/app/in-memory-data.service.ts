import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    let sedes = [
      {
        id: 1,
        nombre: 'Puesto de salud 31 de Marzo',
        latitud: '2.447183159454304',
        longitud: '-76.64335417894287',
      },
      {
        id: 2,
        nombre: 'Centro de salud loma virgen',
        latitud: '2.4406027196030813',
        longitud: '-76.59548832458847',
      },
      {
        id: 3,
        nombre: 'Centro de Yanaconas  ',
        latitud: '2.4406027196030813 ',
        longitud: '-76.59548832458847',
      },
      {
        id: 4,
        nombre: 'Hospital Maria Occidente',
        latitud: '2.4406027196030813',
        longitud: '-76.59548832458847',
      },
    ];
    return { sedes };
  }
}

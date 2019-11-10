import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


// En Angular 8 no funciona: ng g s services/settings -m="app.module.ts" --spec=false
// porque el "-m" no se usa ya. Ahora aparece lo siguiente y funciona igual
// Injectable({providedIn: 'root'}) porque lo inyecta donde corresponde
@Injectable({
   providedIn: 'root'
 })
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _DOCUMENT) {
    this.cargarAjustes();
  }

  // Guarda en local storage para hacer persistencia del tema seleccionado
  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('CARGANDO DE LOCAL STORAGE');
      // console.log('Cargado del localStorage temaUrl: ', this.ajustes.temaUrl);
      // console.log('Cargado del localStorage tema: ', this.ajustes.tema);
    } else {
      // console.log('USANDO VALORES POR DEFECTO');
      // console.log('Cargado temaUrl: ', this.ajustes.temaUrl);
      // console.log('Cargado tema: ', this.ajustes.tema);
    }
    this.aplicarTema( this.ajustes.tema);
    // console.log('--------------------------');
  }

  aplicarTema( tema: string ) {

      // IMP: Este símbolo "`" es para hacer un template literal
      let url = `assets/css/colors/${ tema }.css`;
      this._DOCUMENT.getElementById('theme').setAttribute('href', url);

      // Guardamos en local Storage para hacer persistencia del tema
      this.ajustes.tema = tema;
      this.ajustes.temaUrl = url;

      this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

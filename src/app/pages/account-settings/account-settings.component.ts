import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // Con esta declaración tenemos acceso al DOM
  // Con _ajustes llamamos al servicio para guardar en local storage
  constructor( public _AJUSTES: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: ElementRef) {
    // console.log(link);
    this.aplicarCheck( link );

    this._AJUSTES.aplicarTema( tema );

  }

  aplicarCheck( link: any) {
    const selectors = document.getElementsByClassName('selector');

    for ( const ref of selectors ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectors = document.getElementsByClassName('selector');
    const tema = this._AJUSTES.ajustes.tema;

    for ( const ref of selectors ) {
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }

    }
  }
}

import { NgForm, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../pages/models/usuario.model';

declare function init_plugins();

// Declaramos una constante que será referencia a Google API (gapi)
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  // El objeto Sing-in de Google (explicado en la API de Google)
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    // Cuando se inicializa la página de login, miro el localStorage si tengo el mail
    // si no lo tengo, pongo '' para que se inicialice y no de error la vable (undefined)
    // Si lo tengo lo asigno al campo del HTML [ngModel]="email"
    this.email = localStorage.getItem('email') || '';
    if  ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
         // información en https://console.developers.google.com/
          client_id: '716004520200-kk106sht93u2jc1eaj7hcktafqcs8ec7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      // Cuando tenemos el token de Google, llamamos a la autenticación
      // de backend con el token para que lo verifique y redireccionamos
      this._usuarioService.loginGoogle( token )
        .subscribe( () => window.location.href = '#/dashboard' ); 
    });
  }

  ingresar( forma: NgForm ) {

    // Aunque cuando llegamos aquí el formulario es "valid", esto se
    // denomina "formula de sanidad".
    // Si el formulario no es válido que se salga.
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( () => this.router.navigate(['/dashboard']));

  }
}

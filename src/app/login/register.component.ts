import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../pages/models/usuario.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  noSonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      // Si llega aquí salta la validación, por lo que no deja avanzar
      return {
        noSonIguales: true
      };
    };
  }

  noCumpleLongitud( campo1: string ) {
    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value + '_';
      const tamany1 = pass1.length;

      // Tener al menos 7 caracteres
      if  ( tamany1 > 7 ) {
        return null;
      }

      // Si llega aquí salta la validación, por lo que no deja avanzar
      return {
        noCumpleLongitud: true
      };
    };
  }

  noCumpleFormato( campo1: string ) {
    return ( group: FormGroup ) => {


      const pass1 = group.controls[campo1].value + '_';
      const esNumerico = /\d/.test(pass1);
      const esMayuscula = /[A-Z]/.test(pass1);
      const esMinuscula = /[a-z]/.test(pass1);
      const valid = esNumerico && esMayuscula && esMinuscula;

      // console.log('hasNumber: ' + hasNumber);
      // console.log('hasUpper: ' + hasUpper);
      // console.log('hasLower: ' + hasLower);
      // console.log('valid: ' + valid);
      // console.log('------------------------------');

      if (valid) {
        return null;
      }

      // Si llega aquí salta la validación, por lo que no deja avanzar
      return {
        noCumpleFormato: true
      };
    };
  }

  ngOnInit() {
    // Esto reinicia la pantalla cuando se hace crtl-F5
    // o se recarga el browser
    init_plugins();

    this.forma = new FormGroup({
       nombre: new FormControl( null, Validators.required ),
       correo: new FormControl( null, [Validators.required, Validators.email] ),
       password: new FormControl( null, Validators.required),
       password2: new FormControl( null, Validators.required),
       condiciones: new FormControl( false )
    }, { validators: [this.noSonIguales('password', 'password2'),
                      this.noCumpleLongitud('password'),
                      this.noCumpleFormato('password')] } );

    this.forma.setValue ({
      nombre: 'Test',
      correo: 'popo@popo.com',
      password: '1234567',
      password2: '1234567',
      condiciones: true
    });


  }

  registrarUsuario() {
    if ( this.forma.invalid) {
      return;
    }

    if ( !this.forma.value.condiciones) {
      // console.log(' Debe aceptar las condiciones');
      Swal.fire(
        'Importante!',
        'Debe aceptar las condiciones',
        'warning'
      );
      return;
    }

    // Aquí sabemos que los datos son válidos por lo que
    // podemos llamar al serviicio para grabar:

    // 1.- Preparamos el objeto a enviar con la información necesaria:
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    // 2.- Llamada en sí al servicio
    // En resp tendremos la información que devuelve postman (JSON)
    this._usuarioService.crearUsuario( usuario )
      .subscribe( resp => this.router.navigate(['/login']));
        // Swal.fire(
        //   'Importante!',
        //   'Debe aceptar las condiciones',
        //   'warning'
        // );
  }

}

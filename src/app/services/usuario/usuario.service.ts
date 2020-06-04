import { Injectable } from '@angular/core';
import { Usuario } from '../../pages/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router} from '@angular/router';
// No importamos rxjs/Rx porque ocupa poco. Solo importamos
// lo que necesitamos, en este caso el operador "map"
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Variables para comprobar que el usuario o token existen
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService ) {
      this.cargarStorage();
    }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token   = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Variables de la clase para guardar el usuario y token que recibo en las variables
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token   = '';
    this.usuario = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  // login con Google
  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario);
          // Esto es para devolver un acknoledge
          return true;
        })
      );
    }

  // Login normal
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
                map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario);
                  // Esto es para devolver un acknoledge
                  return true;
              })
          );
  }

  crearUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';
     return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({ title: 'Usuario creado correctamente!', 
                      text: 'Mail: ' + usuario.email,
                      icon: 'success' });
          return resp.usuario;
        })
      );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {

          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
          Swal.fire({ title: 'Usuario actualizado correctamente!',
                      text: 'Usuario: ' + usuario.nombre + '\n Email: ' + usuario.email,
                      icon: 'success' });
          return true;
      })
    );
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({ title: 'Imagen actualizada correctamente!',
                     text: 'Usuario: ' + this.usuario.nombre,
                     icon: 'success' });
        this.guardarStorage( id, this.token, this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      })
  }

}

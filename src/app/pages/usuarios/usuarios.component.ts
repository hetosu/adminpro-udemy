import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { subscribeOn } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { PAGINACION } from 'src/app/config/config';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  // Contador de total de registros que nos devuelve el servicio de usuarios
  totalRegistros: number = 0;

  // Para manejar el spin
  cargando: boolean = true;

  // Para deshabilitar el botón de "Siguientes" si llegamos al final
  isDisabledSiguientes: boolean = false;
  isDisabledAnteriores: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  // Para cargar la tabla de usuarios
  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

        this.controlBotonesPaginacion();

      });
  }

  // Para paginar la tabla de usuarios
  cambiarDesde(valor: number, termino: string) {

      // let desde = this.desde + valor;
      const desde = this.desde + (PAGINACION * valor);
      // console.log( desde );
      // console.log('totalRegistros: ', this.totalRegistros);

      if ( desde >= this.totalRegistros ) {
        return;
      }

      if ( desde < 0 ) {
        return;
      }

      // this.desde += valor;
      this.desde += (PAGINACION * valor);

      if (termino === '') {
        this.cargarUsuarios();
      } else {
        this.buscarUsuario(termino);
      }
  }

  // Para buscar usuarios
  buscarUsuario(termino: string) {

    if ( termino.length <= 0 ) {
      this.desde = 0;
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino, this.desde )
      .subscribe( (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;

          this.controlBotonesPaginacion();
      });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( this._usuarioService.usuario.role !== 'ADMIN_ROLE') {
      Swal.fire({ title: 'Solo los administradores tienen permisos para borrar usuarios!',
      text: 'Usuario: ' + usuario.nombre,
      icon: 'info' });
      return;
    }

    // this._usuarioService.usuario._id es el id del usuario logado actualmente
    // en la aplciación
    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({ title: 'No se puede eliminar a si mismo',
      text: 'Usuario: ' + usuario.nombre,
      icon: 'error' });
      return;
    }

    Swal.fire({
      title: 'Estás seguro/a de borrar el usuario "' + usuario.nombre + '"?',
      text: '(Esta operación no se puede deshacer!)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe( borrado => {
            console.log( borrado );
            this.cargarUsuarios();
        });
      }
    });

  }

  controlBotonesPaginacion() {
    // Si la carga de usuario en esa página (máximo de 5) es distinta de la PAGINACION (5)
    // deshabilitamos porque quiere decir que estamos en la última página
    if (this.usuarios.length !== PAGINACION) {
      this.isDisabledSiguientes = true;
    } else {
      this.isDisabledSiguientes = false;
    }

    // Si estamos al principio del todo el botón anterior debe estar deshabilitado
    if (this.desde === 0) {
      this.isDisabledAnteriores = true;

    } else {
      this.isDisabledAnteriores = false;
    }
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();
  }

}




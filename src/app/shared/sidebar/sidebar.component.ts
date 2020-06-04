import { Component, OnInit } from '@angular/core';
import { SidebarService,  UsuarioService } from '../../services/service.index';
import { Usuario } from '../../pages/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _SIDEBAR: SidebarService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}

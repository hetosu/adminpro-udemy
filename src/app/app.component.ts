import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adminpro';

  // Al inje ctar así esto, lanza el constructor de la 
  // clase nada más entrar en la aplicación
  constructor( public _AJUSTES: SettingsService ) {}
}

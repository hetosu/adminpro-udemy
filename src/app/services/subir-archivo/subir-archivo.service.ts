import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // tipo: medico, hospital, usuario
  // id: id del objeto que quiero
  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise( (resolve, reject) => {
      // FormData: Es lo que se manda a la petición por ajax. Esto es javascript puro
      let formData = new FormData();
      // Inicializamos la peticion AJAX
      let xhr = new XMLHttpRequest();

        // Configuración del FormData
        // 'imagen': EL campo del body en el servicio upload de Postman
      formData.append( 'imagen', archivo, archivo.name)

      // Configuración de la petición AJAX
      xhr.onreadystatechange = function() {

        // Si ha finalizado la subida (4)
        if ( xhr.readyState === 4 ) {
          // Si se ha subido bien (200)
          if ( xhr.status === 200 ) {
            console.log('Imagen subida');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Falló la subida');
            reject( xhr.response );

          }
        }
      };

      // URL al que queremos hacer la petición
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      // Abro el servicio
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}

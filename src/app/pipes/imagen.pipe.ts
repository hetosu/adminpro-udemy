import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      // Como la imagen xxx no existe regresa la imagen por defecto que cargamos
      return url + '/usuarios/xxx';
    }

    // Si localiza 'googleusercontent' quiere decir que es una imagen de google
    // Se comprueba porque es lo que devuelve el servicio postman de recuperar 
    // usuario en el campo img del usuario
    if ( img.indexOf('googleusercontent') >= 0 ) {
      return img;
    }

    // Aquí hay que validar que tipo de imagen (hospital, usuario o médico)
    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'medico':
        url += '/medicos/' + img;
        break;

      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('Tipo de usuarios no existe. Sólo usuarios / medicos / hospitales');
        // Como la imagen xxx no existe regresa la imagen por defecto que cargamos
        return url + '/usuarios/xxx';
    }

    return url;
  }

}


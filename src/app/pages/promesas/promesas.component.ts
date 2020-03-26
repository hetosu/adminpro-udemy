import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contarTres().then(
      mensaje => console.log('Terminó! ', mensaje)
    )
    .catch( error => console.log('Error en la promesa', error));

   }

    ngOnInit() {
    }

    contarTres(): Promise<boolean> {

      return new Promise( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador += 1;
        console.log('Contador: ', contador);

        if ( contador === 3 ) {
           resolve(true);
           clearInterval(intervalo);
        }

      }, 1000 ) ;

    });

    }

}

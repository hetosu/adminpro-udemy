import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.devuelveObservable()
    .subscribe(
      numero => console.log( 'Subs ', numero),
      error => console.error( 'Error en el obs ', error),
      () => console.log( 'El observador terminó!')
   );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscripcion.unsubscribe();
  }

  devuelveObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;


        const salida = {
          valor: contador
        };

        observer.next(salida);

        // Para parar el observable
        // if ( contador === 3) {
        //   clearInterval( intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2) {
        //  observer.error('Auxilio!');
        // }

      }, 1000);

   }).pipe(
      map( resp => resp.valor),
      // Al valor de respuesta del map se le aplica
      filter( (valor, index)  => {
        // console.log('Filter', valor, index);

        if ( (valor % 2) === 1 ){
          // impar
          return true;

        } else {
          // par
          return false;
        }

      })
   );

  }

}

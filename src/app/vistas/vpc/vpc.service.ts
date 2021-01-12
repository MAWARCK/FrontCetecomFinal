import { Injectable } from '@angular/core';
import { Pc } from '../../modelos/Pc'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of ,throwError } from 'rxjs';  //funciones para convertir o crear un  observable
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VpcService {

  private urlEndPoint:string = 'http://localhost:8034/api/pc';

  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private http: HttpClient, 
    private router: Router
    ) { }


  //lista los datos en la tabla || aacabo de implementar que los campos de
  //marca ventilador se visualicen en la tabla con mayusculas
  getPcs(page:number): Observable<any[]>{
    return this.http.get<Pc[]>(this.urlEndPoint + '/page/' + page).pipe(//uso de tap para mostrar datos
      // ///creamos una variable dentro del tap como un arreglo que muestra los datos sin tocar los datos ni modificar
      tap( (response:any) => {
        console.log('VpcService: tap 1');
        (response.content as Pc[]).forEach( pc => {
          console.log(pc.marca);
        });
      }),
      map( (response:any) => {
           //este return es para el map del observable
           (response.content as Pc[]).map(pc => {
            pc.marca = pc.marca.toUpperCase();//con estos metodos nosotros mostramos los campos en mayusculas
            pc.modelo = pc.modelo.toUpperCase();//con estos metodos nosotros mostramos los campos en mayusculas
            return pc;// este return es para el map de pc
           });//retarnamos el objeto
           return response;
      }),
      //ejemplo con tap para mostrar los datos
      ///creamos una variable dentro del tap como un arreglo que muestra los datos sin tocar los datos ni modificar
      tap( (response:any) => {
        console.log('VpcService: tap 2');
         (response.content as Pc[]).forEach( pc =>{
          console.log(pc.marca);
        })
      })
    );// Arrau fansh estructura o funcion en forma de flecha para crear funciones anonimas en ECs
  }

  //inserta los datos en la base de datos por medio del service
  //traemos los datos en un json con un tipo any
  create(pc: Pc) : Observable<Pc>{
    return this.http.post(this.urlEndPoint, pc, {headers: this.httpHeaders}).pipe(
      map( (response:any )=> response.pc as Pc),
      catchError(e => {
//manejamos los errores
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error);
        Swal.fire('El Pc no se pudo agregar',`${e.error.message}`,'error'); //ahora funciona asi esta shit `${e.error.mensaje, e.error.message}`
        return throwError(e);
      })
      
    )

  }

   //trae los datos a los campos para ser modificados, ademas implementa la funcionalidad de modificar
 getPc(id): Observable<Pc>{
  return this.http.get<Pc>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['pcs']);
      console.error(e.error.mensaje);
      Swal.fire('Error al Editar',`${e.error.message}`, 'error');
      return throwError(e);
    })
  );
}

//este es el metodo que modifica las cosas
update(pc: Pc): Observable<Pc>{
  return this.http.put<Pc>(`${this.urlEndPoint}/${pc.id}`, pc, {headers: this.httpHeaders}).pipe(
   catchError(e => {
     //manejamos los errores
     if(e.status==400){
       return throwError(e);
     }

     this.router.navigate(['pcs-formulario']);
   console.error(e.error.mensaje);
   Swal.fire('Error al Editar el Pc', `${e.error.message}`, 'error');
   return throwError(e);
 })
);
  
}


//este es el metodo que elimina un ventilador de la base de datos
delete(idPc: number): Observable<Pc>{
  return this.http.delete<Pc>(`${this.urlEndPoint}/${idPc}`, {headers: this.httpHeaders}).pipe(
   catchError(e => {
     this.router.navigate(['pcs']);
   console.error(e.error.mensaje);
   Swal.fire('Error al eliminar el PC', `${e.error.message}`, 'error');
   return throwError(e);
 })
   );
  
}









}

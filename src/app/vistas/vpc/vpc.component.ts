import { Component, OnInit } from '@angular/core';
import { Pc } from '../../modelos/Pc';
import { VpcService } from './vpc.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-vpc',
  templateUrl: './vpc.component.html',
  styleUrls: ['./vpc.component.css']
})
export class VpcComponent implements OnInit {

  pcs: Pc[];
  paginador: any;


  constructor(
    private vpcservice: VpcService, //se carga el constructor que posee el crudservice, instancia
    private activatedRoute: ActivatedRoute
  ) { }


   //basicamente usamos el tap para imprimir datos por consola, es decir
  //es lo que estoy realizando aquí
  //el operador tap no retoirna anda
  ngOnInit(): void {
        //activatedroute es para map se encarga de suscribir un observador cada vez que cambia el parametro page en la ruta se va a refrescar el nuevo rango
        this.activatedRoute.paramMap.subscribe( params => {
          let page: number = +params.get('page');//realizo la conversion para pasarlo de string a number, el operador de suma en este caso convierte automaticamente a number
          
          if (!page) { //validacion para ver si page no está definido es igual a la pagina de inicio
            page = 0;
          }
          
          this.vpcservice.getPcs(page)
          .pipe(
            tap( (response: any) => {
              console.log('VcpComponent: tap 3');
              (response.content as Pc[]).forEach( (pc) =>{
               console.log(pc.marca);
             });
            })
          ).subscribe(response => {
            this.pcs = response.content as Pc[];
            this.paginador = response;
          }); //subscribe(ventiladores => this.ventiladores = ventiladores); se llama el metodo y se carga el vvalor de los ventiladores a el de la variable
          
            }
          );
  }

  //creamos un metodo que conectanga el eliminar y un mensaje
  delete(pcs: Pc): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar este Pc ${pcs.marca} ${pcs.modelo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.vpcservice.delete(pcs.id ).subscribe(
          response =>{
            this.pcs = this.pcs.filter(vent => vent !== pcs)
            swal.fire(
              'Pc Eliminado!',
              `Pc ${pcs.marca} eliminado con éxito.`,
              'success'
            )
          }
        )//aqui va la validacion para la segunda parte de la animacion
        
      } 
    })
  }





}

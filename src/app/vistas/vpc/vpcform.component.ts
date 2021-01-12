import { Component, OnInit } from '@angular/core';
import { Pc } from '../../modelos/Pc';
import { VpcService } from '../vpc/vpc.service';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import swal from 'sweetalert2';  //import de los mensajes de alerta


@Component({
  selector: 'app-vpcform',
  templateUrl: './vpcform.component.html',
  styleUrls: ['./vpcform.component.css']
})
export class VpcformComponent implements OnInit {


  public pc: Pc = new Pc();
  public titulo:string = "Ingresar PC";
  public errores:string [];


  constructor(
    private vpcService: VpcService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarpc();
  }

  //medodo para cargar ventiladores en los campos al momento de modificar los datos
  cargarpc(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.vpcService.getPc(id).subscribe( (pc) => this.pc = pc)
      }
    });
  }
   //creo el metodo para actualizar los datos de los ventiladores
  //realizo la validacion para el cambio de pestañas al momento de actualizar un dato
  //es decir, cuando el dato es nulo seguirá en el formulario de lo contrario cambiará a la tabla
  update(): void{
    this.vpcService.update(this.pc)
    .subscribe(pc => {
      swal.fire('Pc Actualizado', `Pc ${this.pc.marca} actualizado con éxito!`, 'success');
      if(pc != null){
        this.router.navigate(['pcs'])
      }else{
        this.router.navigate(['pcs-formulario'])
      }  
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el back-end: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }

//En este metodo create hacemos el ingreso a la base de datos
  
  /*Este codigo es para ingresar el codigo por consola
  *console.log("Clicked!")
    console.log(this.pc) */

    //revisar el error al momento de crear un pc, el mensaje no muestra el nombre del pc
    //principal problema ServiceEntiti<>
    public create():void{
      this.vpcService.create(this.pc)
      .subscribe(pc => {
        swal.fire('Nuevo Pc', `El Pc ${this.pc.marca}`, 'success') //mostrar el mensjae de alerta
         this.router.navigate(['pcs']) 
         //seleccionamos la ruta en la que se quedará
         console.error(pc.marca);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el back-end: ' + err.status);
          console.error(err.error.errors);
        }
      );
    }
    


}

 
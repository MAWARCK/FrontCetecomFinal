import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //mensaje de alerta momentaneo
  alert(): void{
    Swal.fire('Upss!', 'Este campo aún no es parte de la fecha de entrega', 'info');
  }

}

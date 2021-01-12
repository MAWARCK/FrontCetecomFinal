import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //mensaje de alerta momentaneo
  alert(): void{
    Swal.fire('Upss! Login', 'Este campo aún no es parte de la fecha de entrega', 'info');
  }

}

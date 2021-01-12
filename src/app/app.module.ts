//importaciones
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { HomeComponent } from './vistas/home/home.component';
import { MenuComponent } from './vistas/menu/menu.component';
import { VpcComponent } from './vistas/vpc/vpc.component';
import { VpcformComponent } from './vistas/vpc/vpcform.component';
import { PaginatorComponent } from './vistas/paginator/paginator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VmonitorComponent } from './vistas/vmonitor/vmonitor.component';
import { VmonitorformComponent } from './vistas/vmonitor/vmonitorform.component';


//definimos las rutas por medio de una constante
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  
  { path: 'pcs', component: VpcComponent },
  { path: 'pcs/page/:page', component: VpcComponent },
  { path: 'pcs-formulario', component: VpcformComponent },
  { path: 'pcs-formulario/form/:id', component: VpcformComponent },

  { path: 'monitores', component: VmonitorComponent },
  //agregar paginacion de la tabla monitores
  { path: 'monitores-formulario', component: VmonitorformComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    VpcComponent,
    VpcformComponent,
    PaginatorComponent,
    VmonitorComponent,
    VmonitorformComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

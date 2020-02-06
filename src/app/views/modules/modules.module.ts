import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { LoteBoletaModule } from './loteBoleta/loteBoleta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LugarModule } from './lugar/lugar.module';
import { EmpresaModule } from './empresa/empresa.module';
import { EntradaModule } from './entrada/entrada.module';
import { EventoModule } from './cliente/evento/evento.module';
import { EventoConfigModule } from './evento/evento.module';
import { PuntoVentaModule } from './puntoVenta/puntoVenta.module';
import { VentaModule } from './Venta/Venta.module';
import { PuntoVendedorModule } from './puntoVendedor/puntoVendedor.module';
import { PrecioModule } from './precio/precio.module';
import { PuntoEventoModule } from './puntoEvento/puntoEvento.module';
import { EmpresaPerfilModule } from './empresaPerfil/empresaPerfil.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { SelectModule } from 'angular2-select'; 



import { LugarComponent } from './lugar/lugar.component';
import { PrecioComponent } from './precio/precio.component';
import { PuntoVendedorComponent } from './puntoVendedor/puntoVendedor.component';
import { PuntoEventoComponent } from './puntoEvento/puntoEvento.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { BoletaComponent } from './boleta/boleta.component';
import { LoteBoletaComponent } from './loteBoleta/loteBoleta.component';
import { EmpresaPerfilComponent } from './empresaPerfil/empresaPerfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EntradaComponent } from './entrada/entrada.component';
import { EventoComponent } from './cliente/evento/evento.component';
import { EventoConfigComponent } from './evento/evento.component';
import { HomeComponent } from './cliente/home/home.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';
import { PuntoVentaComponent } from './puntoVenta/puntoVenta.component';
import { VentaComponent } from './venta/venta.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleMapsAPIWrapper, AgmCoreModule } from '@agm/core';




@NgModule({
  imports: [ 
    CommonModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule,
    NgbModule,
    ModulesRoutingModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    LoteBoletaModule,
    UsuarioModule,
    LugarModule,
    EmpresaModule,
    EntradaModule,
    EventoModule,
    EventoConfigModule,
    NgxQRCodeModule,
    PuntoVentaModule,
    VentaModule,
    SelectModule,
    PuntoVendedorModule,
    PuntoEventoModule,
    PrecioModule,
    EmpresaPerfilModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE4fzSoCEHjBoGocIFwLz8BSqi0ti1o0g',
      libraries: ["places"]
    }), 

  ],
  providers:[GoogleMapsAPIWrapper, AgmCoreModule],
  declarations: [
    EmpresaComponent, 
    BoletaComponent, 
    LoteBoletaComponent, 
    UsuarioComponent,
    LugarComponent,
    EntradaComponent,
    EventoComponent,
    HomeComponent,
    PerfilComponent,
    EventoConfigComponent,
    PuntoVentaComponent,
    VentaComponent,
    PuntoVendedorComponent,
    PuntoEventoComponent,
    PrecioComponent,
    EmpresaPerfilComponent,
  ]
})
export class ModulesModule { }

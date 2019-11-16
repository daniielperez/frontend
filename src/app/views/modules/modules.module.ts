import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LugarModule } from './lugar/lugar.module';
import { EmpresaModule } from './empresa/empresa.module';
import { EntradaModule } from './entrada/entrada.module';
import { EventoModule } from './cliente/evento/evento.module';
import { EventoConfigModule } from './evento/evento.module';


import { LugarComponent } from './lugar/lugar.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { BoletaComponent } from './boleta/boleta.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EntradaComponent } from './entrada/entrada.component';
import { EventoComponent } from './cliente/evento/evento.component';
import { EventoConfigComponent } from './evento/evento.component';
import { HomeComponent } from './cliente/home/home.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';


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
    CategoriaModule,
    UsuarioModule,
    LugarModule,
    EmpresaModule,
    EntradaModule,
    EventoModule,
    EventoConfigModule,
    NgxQRCodeModule
  ],
  providers:[GoogleMapsAPIWrapper],
  declarations: [
    EmpresaComponent, 
    BoletaComponent, 
    CategoriaComponent, 
    UsuarioComponent,
    LugarComponent,
    EntradaComponent,
    EventoComponent,
    HomeComponent,
    PerfilComponent,
    EventoConfigComponent,
  ]
})
export class ModulesModule { }

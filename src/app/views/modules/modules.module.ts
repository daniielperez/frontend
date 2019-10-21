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


import { LugarComponent } from './lugar/lugar.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { BoletaComponent } from './boleta/boleta.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

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
  ],
  declarations: [
    EmpresaComponent, 
    BoletaComponent, 
    CategoriaComponent, 
    UsuarioComponent,
    LugarComponent,
  ]
})
export class ModulesModule { }

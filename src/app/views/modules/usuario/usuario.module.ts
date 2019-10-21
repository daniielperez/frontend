import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({ 
  imports: [
    CommonModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
  ],
  exports: [
    NewComponent,
    EditComponent,
  ],
  declarations: [
    NewComponent,
    EditComponent, 
  ]
})
export class UsuarioModule { }

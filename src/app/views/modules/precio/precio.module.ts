import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { SelectModule } from 'angular2-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NewComponent, EditComponent], 
  imports: [
    CommonModule,
    NgbModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    SelectModule,
  ],
  exports: [
    NewComponent,
    EditComponent,
  ]
})
export class PrecioModule { }

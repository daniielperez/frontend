import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { CustomFormsModule } from 'ng2-validation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { AgmCoreModule } from '@agm/core';
import { bindCallback } from '../../../../../node_modules/rxjs';

@NgModule({
  declarations: [NewComponent, EditComponent], 
  imports: [
    CommonModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE4fzSoCEHjBoGocIFwLz8BSqi0ti1o0g',
      libraries: ["places"]
    })
  ],
  providers: [
    AgmCoreModule,
  ],
  exports: [
    NewComponent,
    EditComponent,
  ]
})
export class LugarModule { }

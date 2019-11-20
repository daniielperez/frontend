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

import { TagInputModule } from 'ngx-chips';

import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    SelectModule,
    TagInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE4fzSoCEHjBoGocIFwLz8BSqi0ti1o0g',
      libraries: ["places"]
    }), 
    MatGoogleMapsAutocompleteModule.forRoot(),
  ],
  declarations: [
    NewComponent,
    EditComponent,
  ],
  exports: [  
    NewComponent, 
    EditComponent
  ], 

})
export class EmpresaModule { }

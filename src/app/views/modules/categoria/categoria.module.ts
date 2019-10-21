import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    NewComponent,
    EditComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriaModule { }

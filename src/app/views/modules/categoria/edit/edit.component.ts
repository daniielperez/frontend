import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../../../../services/categoria.service';
import { EventoService } from '../../../../services/evento.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() categoria: any = null;

  loading: boolean;
  formBasic: FormGroup;
  eventoSelect;
  eventos;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _CategoriaService: CategoriaService,
    private _EventoService: EventoService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._EventoService.select().subscribe(
      response => { 
        this.eventos = response;
        setTimeout(() => {
          this.eventoSelect = [this.categoria.evento.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  } 
  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.categoria.nombre, Validators.required],
      eventoSelect: ['', Validators.required]
    });
  }

  onSubmit() {

    this.loading = true;

    let arrayDatos = {
      id: this.categoria.id,
      nombre: this.categoria.nombre,
      evento: this.eventoSelect.toString(), 
    };

    this._CategoriaService.edit(arrayDatos).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        }
    }, error => {
        alert(error.error.error_description);
    })

  }

  onCloseModal(){
    this.modalService.dismissAll();
  }

}

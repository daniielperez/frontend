import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../../../../services/categoria.service';
import { EventoService } from '../../../../services/evento.service';
import { Categoria } from '../../../../model/categoria';


@Component({
  selector: 'app-new-categoria',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public categoria: Categoria;
  public eventos;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _CategoriaService: CategoriaService,
    private _EventoService: EventoService,
  ) { 
    this.categoria = new Categoria(null, null, null);
  }
  ngOnInit()
  {
    this._EventoService.select().subscribe(
      response => { 
        this.eventos = response;
    }, error => {
      alert(error.error.error_description);
    });

    this.buildFormBasic();
  }
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      evento: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this._CategoriaService.new(this.categoria).subscribe(
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

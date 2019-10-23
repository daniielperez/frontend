import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa.service';
import { Empresa } from '../../../../model/empresa';


@Component({
  selector: 'app-new-empresa',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public empresa: Empresa;
  itemsCorreos = [];
  itemsTelefonos = [];
  correos = new FormControl(this.itemsCorreos);
  telefonos = new FormControl(this.itemsTelefonos);

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EmpresaService: EmpresaService,
  ) { 
    this.empresa = new Empresa(null, null, null, null,null, null, null, null);
  }
  ngOnInit()
  {
    this.buildFormBasic();
  }
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      logo: ['', Validators.required],
      portada: ['', Validators.required],
      direccion: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    let array = {
      empresa: this.empresa,
      correos: this.correos,
      telefonos: this.telefonos,
    }
    this._EmpresaService.new(array).subscribe(
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

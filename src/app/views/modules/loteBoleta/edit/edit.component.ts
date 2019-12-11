import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoteBoletaService } from '../../../../services/loteBoleta.service';

@Component({
  selector: 'app-edit-loteBoleta',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() loteBoleta: any = null;

  loading: boolean;
  formBasic: FormGroup;
  eventos;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _LoteBoletaService: LoteBoletaService,
  ) { }

  ngOnInit() {
    this.buildFormBasic();
  } 
  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      categoria: [this.loteBoleta.categoria, Validators.required],
      fin: [this.loteBoleta.fin, Validators.required],
      inicio: [this.loteBoleta.inicio, Validators.required]
    });
  }

  onSubmit() {

    this.loading = true;

    let arrayDatos = { 
      id: this.loteBoleta.id,
      categoria: this.loteBoleta.categoria,
      inicio: this.loteBoleta.inicio,
      fin: this.loteBoleta.fin,
      evento: this.loteBoleta.evento.id, 
    };

    this._LoteBoletaService.edit(arrayDatos).subscribe(
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

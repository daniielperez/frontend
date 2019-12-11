import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoteBoletaService } from '../../../../services/loteBoleta.service';
import { EventoService } from '../../../../services/evento.service';
import { LoteBoleta } from '../../../../model/loteBoleta';


@Component({
  selector: 'app-new-loteBoleta',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() idEvento: any = null;
  formBasic: FormGroup;
  loading: boolean;
  public loteBoleta: LoteBoleta;
  public eventos;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _LoteBoletaService: LoteBoletaService,
  ) { 
    this.loteBoleta = new LoteBoleta(null, null, null, null, null);
  }

  ngOnInit()
  {
    this.buildFormBasic();
  }
   
  buildFormBasic() {
    this.formBasic = this.fb.group({
      categoria: ['', Validators.required],
      fin: ['', Validators.required],
      inicio: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.loteBoleta.evento = this.idEvento; 
    this._LoteBoletaService.new(this.loteBoleta).subscribe(
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

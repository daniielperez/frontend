import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrecioService } from '../../../../services/precio.service';
import { UserService } from '../../../../services/user.service';

@Component({ 
  selector: 'app-edit-precio',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() precio: any = null;

  loading: boolean;
  formBasic: FormGroup;

  public usuarios;
  public vendedorSelect;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PrecioService: PrecioService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log(this.precio);
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.precio.fechaInicio = {year: parseInt(this.precio.anioInicio), month: parseInt(this.precio.mesInicio), day: parseInt(this.precio.diaInicio)}
    this.precio.fechaFin = {year: parseInt(this.precio.anioFin), month: parseInt(this.precio.mesFin), day: parseInt(this.precio.diaFin)}
    this.formBasic = this.fb.group({
      valor: [this.precio.valor, Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
    this.cdref.detectChanges();
  }
 
  onSubmit() {

    this.loading = true;
    let arrayDatos = {
      id: this.precio.id,
      fechaInicio: this.precio.fechaInicio['year']+'-'+this.precio.fechaInicio['month']+'-'+this.precio.fechaInicio['day'],
      fechaFin: this.precio.fechaFin['year']+'-'+this.precio.fechaFin['month']+'-'+this.precio.fechaFin['day'],
      valor: this.precio.valor,
      loteBoleta: this.precio.loteBoleta, 
    };
    this._PrecioService.edit(arrayDatos).subscribe(
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

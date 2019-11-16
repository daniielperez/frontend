import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoService } from '../../../../services/evento.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { LugarService } from '../../../../services/lugar.service';

@Component({
  selector: 'app-edit-evento',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() evento: any = null;

  loading: boolean;
  formBasic: FormGroup;
  empresaSelect;
  lugarSelect;
  lugares;
  empresas;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EventoService: EventoService,
    private _EmpresaService: EmpresaService,
    private _LugarService: LugarService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this._EmpresaService.select().subscribe(
      response => { 
        this.empresas = response;
        setTimeout(() => {
          this.empresaSelect = [this.evento.empresa.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this._LugarService.select().subscribe(
      response => { 
        this.lugares = response;
        setTimeout(() => {
          this.lugarSelect = [this.evento.lugar.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });

    this.buildFormBasic();
  } 
  
  buildFormBasic() {
    this.evento.fecha = {year: parseInt(this.evento.anio), month: parseInt(this.evento.mes), day: parseInt(this.evento.dia)}
    this.formBasic = this.fb.group({
      totalBoletas: [this.evento.totalBoletas, Validators.required],
      nombre: [this.evento.nombre, Validators.required],
      lugarSelect: ['', Validators.required],
      empresaSelect: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.cdref.detectChanges();
  }

  onSubmit() {
    console.log(this.evento.fecha);
    this.loading = true;
    let arrayDatos = {
      id: this.evento.id,
      nombre: this.evento.nombre,
      totalBoletas: this.evento.totalBoletas,
      fecha: this.evento.fecha['year']+'-'+this.evento.fecha['month']+'-'+this.evento.fecha['day'],
      empresa: this.empresaSelect[0],
      lugar: this.lugarSelect[0], 
    };
    this._EventoService.edit(arrayDatos).subscribe(
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

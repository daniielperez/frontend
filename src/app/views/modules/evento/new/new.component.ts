import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaService } from '../../../../services/empresa.service';
import { EventoService } from '../../../../services/evento.service';
import { LugarService } from '../../../../services/lugar.service';
import { Evento } from '../../../../model/evento';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-evento',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public evento: Evento;
  public empresas;
  public lugares;
  public date;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EmpresaService: EmpresaService,
    private _EventoService: EventoService,
    private _LugarService: LugarService,
    private rutaActiva: ActivatedRoute,
    private cdref: ChangeDetectorRef,
  ) { 
    this.evento = new Evento(null, null, null, null, null, null);
  }
  ngOnInit()
  {
    this._EmpresaService.select().subscribe(
      response => { 
        this.empresas = response;
    }, error => {
      alert(error.error.error_description);
    });
    this._LugarService.select().subscribe(
      response => { 
        this.lugares = response;
    }, error => {
      alert(error.error.error_description);
    });

    this.buildFormBasic();
  }
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      totalBoletas: ['', Validators.required],
      lugar: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.evento.fecha = this.evento.fecha['year']+'-'+this.evento.fecha['month']+'-'+this.evento.fecha['day'];
    this.evento.empresa = this.rutaActiva.snapshot.params.idEmpresa;
    this.cdref.detectChanges();
    this._EventoService.new(this.evento).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        }else if(response['code'] == 400){
          this.toastr.error(response['message'], response['title'], {progressBar: true});
          this.loading = false;
        }

    }, error => {
      this.loading = false;
      alert(error.error.error_description);
    })
  }

  onCloseModal(){
    this.modalService.dismissAll();
  }

}

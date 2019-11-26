import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntoVentaService } from '../../../../services/puntoVenta.service';
import { UserService } from '../../../../services/user.service';
import { EventoService } from '../../../../services/evento.service';

@Component({ 
  selector: 'app-edit-puntoVenta',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() puntoVenta: any = null;

  loading: boolean;
  formBasic: FormGroup;
 
  public usuarios;
  public eventos;
  public vendedorSelect;
  public eventoSelect:any;
  public datos;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _PuntoVentaService: PuntoVentaService,
    private _UserService: UserService,
    private cdref: ChangeDetectorRef,
    private _EventoService: EventoService,
  ) { }

  ngOnInit() {
    
    this._EventoService.select().subscribe(
      response => { 
        this.eventos = response;
        setTimeout(() => {
          this.eventoSelect = [this.puntoVenta.evento.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });

    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
        setTimeout(() => {
          this.vendedorSelect = [this.puntoVenta.vendedor.id];
          this.cdref.detectChanges();
        });
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.puntoVenta.nombre, Validators.required],
      direccion: [this.puntoVenta.direccion, Validators.required],
      telefono: [this.puntoVenta.telefono, Validators.required],
      eventoSelect: ['', Validators.required],
      vendedorSelect: ['', Validators.required],  
    });
  }

  onSubmit() {
    this.loading = true;
    this.datos = {
      id: this.puntoVenta.id,
      nombre: this.puntoVenta.nombre,
      direccion: this.puntoVenta.direccion,
      telefono: this.puntoVenta.telefono,
      vendedor: this.vendedorSelect.toString(),
      evento: this.eventoSelect.toString(),
    }
  
    this._PuntoVentaService.edit(this.datos).subscribe(
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

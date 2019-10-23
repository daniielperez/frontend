import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntradaService } from '../../../../services/entrada.service';
import { UserService } from '../../../../services/user.service';
import { Entrada } from '../../../../model/entrada';
import { ActivatedRoute } from '@angular/router'; 
 
@Component({
  selector: 'app-new-entrada',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public entrada: Entrada;
  public usuarios;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _EntradaService: EntradaService,
    private _UserService: UserService,
    private rutaActiva: ActivatedRoute,
  ) { 
    this.entrada = new Entrada(null, null, null, null);
  }

  ngOnInit() {
    let idLugar = this.rutaActiva.snapshot.params.idLugar;
    this._UserService.select().subscribe(
      response => { 
        this.usuarios = response;
    }, error => {
      alert(error.error.error_description);
    });
    this.buildFormBasic();
  } 

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      responsable: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this.entrada.lugar = this.rutaActiva.snapshot.params.idLugar;
    this._EntradaService.new(this.entrada).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.loading = false;
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

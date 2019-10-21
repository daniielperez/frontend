import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../../services/lugar.service';

@Component({
  selector: 'app-edit-lugar',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() lugar: any = null;

  datos 

  loading: boolean;
  formBasic: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _LugarService: LugarService
  ) { }

  ngOnInit() {
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      direccion: [this.lugar.direccion, Validators.required],
      telefono: [this.lugar.telefono, Validators.required],
      celular: [this.lugar.celular, Validators.required],
      nombre: [this.lugar.nombre, Validators.required],
      lat: [this.lugar.lat, Validators.required], 
      lng: [this.lugar.lng, Validators.required],  
    });
  }
  onSubmit() {
    this.loading = true;
    this._LugarService.edit(this.lugar).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.modalService.dismissAll();
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

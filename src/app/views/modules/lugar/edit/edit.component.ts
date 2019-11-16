import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../../services/lugar.service';
import { MouseEvent } from '@agm/core';

@Component({ 
  selector: 'app-edit-lugar',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() lugar: any = null;

  loading: boolean;
  formBasic: FormGroup;
  public marker: any = null;
  public map: any;
  public zoom: number = 12;
  public lat: number = 1.2246233;
  public lng: number = -77.2808208;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _LugarService: LugarService,
    private __zone: NgZone
  ) { }

  ngOnInit() {
    this.__zone.run(() => {    
      this.marker = {
          lat: this.lugar.lat,
          lng: this.lugar.lng,
          draggable: true,
          label: "<br>(" + this.lugar.nombre + ")" + "<br>(" + this.lugar.direccion + ")"
      };
  });
    this.buildFormBasic();
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      direccion: [this.lugar.direccion, Validators.required],
      telefono: [this.lugar.telefono, Validators.required],
      celular: [this.lugar.celular, Validators.required],
      nombre: [this.lugar.nombre, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this._LugarService.edit(this.lugar).subscribe(
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

  mapClicked($event: MouseEvent) {
    this.lugar.lat = $event.coords.lat;
    this.lugar.lng = $event.coords.lng;
    this.__zone.run(() => {    
          this.marker = {
              lat: $event.coords.lat,
              lng: $event.coords.lng,
              draggable: true,
              label: "<br>(" + this.lugar.nombre + ")" + "<br>(" + this.lugar.direccion + ")"
          };
      });
  }

  mapLoad(map) {
    this.map = map;
  }

}

import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../../services/lugar.service';
import { Lugar } from '../../../../model/lugar';
import { MouseEvent } from '@agm/core';

declare var $: any;

@Component({
  selector: 'app-new-lugar',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
 
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public lugar: Lugar;
  public address: any = null;
  public zoom: number = 12;
  public lat: number = 1.2246233;
  public lng: number = -77.2808208;
  public map: any;
  public marker: any = null;
  public LatLng: any;
  public ubicaciones: any = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService, 
    private modalService: NgbModal,
    private _LugarService: LugarService,
    private __zone: NgZone
  ) { 
    this.lugar = new Lugar(null, null, null, null, null, null,null);
  }

  ngOnInit() {
    this.buildFormBasic();
  } 

  buildFormBasic() {
    this.formBasic = this.fb.group({
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    this._LugarService.new(this.lugar).subscribe(
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

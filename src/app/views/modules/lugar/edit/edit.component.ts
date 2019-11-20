import { Component, OnInit, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../../services/lugar.service';
import { MouseEvent, MapsAPILoader } from '@agm/core';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';

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
  public zoom: number = 10;
  public lat: any;
  public lng: any;
  private geoCoder;
  public appearance = Appearance;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _LugarService: LugarService,
    private mapsAPILoader: MapsAPILoader,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.lat = parseFloat(this.lugar.lat);
      this.lng = parseFloat(this.lugar.lng);
      this.zoom = 10;
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(this.lat, this.lng);
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
    this.lugar.lat = this.lat;
    this.lugar.lng = this.lng;
    this.loading = true;
    console.log(this.lugar);
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

  markerDragEnd($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng =  $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.lugar.direccion = results[0].formatted_address;
          this.cdref.detectChanges();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected:', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.getAddress(this.lat, this.lng);
  }

  onCancelar(){
    this.ready.emit(true);
  }

}

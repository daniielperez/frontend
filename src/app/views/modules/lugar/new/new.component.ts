import { Component, OnInit, Output, ChangeDetectorRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LugarService } from '../../../../services/lugar.service';
import { Lugar } from '../../../../model/lugar';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

declare var $: any;

@Component({
  selector: 'app-new-lugar',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public lugar: Lugar;
  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder;
  public selectedAddress: PlaceResult;
  public appearance = Appearance;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService, 
    private modalService: NgbModal,
    private _LugarService: LugarService,
    private mapsAPILoader: MapsAPILoader,
    private cdref: ChangeDetectorRef
  ) { 
    this.lugar = new Lugar(null, null, null, null, null, null,null);
  }

  ngOnInit() {
    this.zoom = 8;
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    this.buildFormBasic();
  } 

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lugar.lat = position.coords.latitude;
        this.lugar.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lugar.lat, this.lugar.lng);
      });
    }
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

  markerDragEnd($event: MouseEvent) {
    this.lugar.lat = $event.coords.lat;
    this.lugar.lng =  $event.coords.lng;
    this.getAddress(this.lugar.lat, this.lugar.lng);
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
    this.lugar.lat= location.latitude;
    this.lugar.lng = location.longitude;
    this.getAddress(this.lugar.lat, this.lugar.lng); 
  }

  onCancelar(){
    this.ready.emit(true);
  }
}

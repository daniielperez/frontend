import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../../services/empresa.service';
import { Empresa } from '../../../../model/empresa';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { LocalStoreService } from "../../../../services/local-store.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-empresa',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  formBasic: FormGroup;
  loading: boolean;
  public empresa: Empresa;
  itemsCorreos = []; 
  itemsTelefonos = [];
  correos = new FormControl(this.itemsCorreos);
  telefonos = new FormControl(this.itemsTelefonos);
  latitude: number;
  longitude: number;
  zoom: number;
  idUsuario:any;
  usuarios:any;
  public file: any = null;
  public fileSelected: File = null;
  private geoCoder;
  public appearance = Appearance;
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _EmpresaService: EmpresaService,
    private mapsAPILoader: MapsAPILoader,
    private cdref: ChangeDetectorRef,
    private store: LocalStoreService,
    private rutaActiva: ActivatedRoute,
  ) { 
    this.empresa = new Empresa(null, null, null, null,null, null, null, null, null, null, null);
  }
  ngOnInit()
  {
    this.file = new FormData();
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
        this.empresa.lat = position.coords.latitude;
        this.empresa.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.empresa.lat, this.empresa.lng);
      });
    }
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      accountId: [''],
      merchantId: [''],
      apiKey: [''],
    });
  }

  onSubmit() {
    this.idUsuario = this.rutaActiva.snapshot.params.idUsuario;
    // this.loading = true;
    let array = {
      empresa: this.empresa,
      correos: this.correos,
      telefonos: this.telefonos,
      idUsuario: this.idUsuario,
    }
    this._EmpresaService.new(this.file, array).subscribe(
      response => { 
        if(response['code'] == 200){
          this.ready.emit(true);
          this.toastr.success('Datos guardados.', 'Perfecto!', {progressBar: true});
        } 
    }, error => {
      alert(error.error.error_description);
    })
  }

  markerDragEnd($event: MouseEvent) {
    this.empresa.lat = $event.coords.lat;
    this.empresa.lng =  $event.coords.lng;
    this.getAddress(this.empresa.lat, this.empresa.lng);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.empresa.direccion = results[0].formatted_address;
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
    this.empresa.lat= location.latitude;
    this.empresa.lng = location.longitude;
    this.getAddress(this.empresa.lat, this.empresa.lng); 
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];
      this.file.append('fileLogo', this.fileSelected);
    }
  }

  onFilePortadaChange(event) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];
      this.file.append('filePortada', this.fileSelected);
    }
  }

  onCancelar(){
    this.ready.emit(true);
  }
}

import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../../services/empresa.service';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { MouseEvent, MapsAPILoader } from '@agm/core';  


@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;
  
  correos;
  telefonos;
  public file: any = null;
  public fileSelected: File = null;
  itemsCorreos=[];
  itemsTelefonos=[];
  public zoom: number = 10;
  public lat: any;
  public lng: any;
  private geoCoder;
  public appearance = Appearance;

  loading: boolean;
  formBasic: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private _EmpresaService: EmpresaService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.file = new FormData();
    this.empresa.merchantId = this.empresa.marchant_id;
    this.empresa.accountId = this.empresa.acount_id;
    this.empresa.apiKey = this.empresa.api_key;
    this.correos = new FormControl(this.empresa.correos);
    this.telefonos = new FormControl(this.empresa.telefonos);
    this.mapsAPILoader.load().then(() => {
      this.lat = parseFloat(this.empresa.lat);
      this.lng = parseFloat(this.empresa.lng);
      this.zoom = 10;
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(this.lat, this.lng);
    });
    this.buildFormBasic();
  } 
  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      nombre: [this.empresa.nombre, Validators.required],
      nit: [this.empresa.nit, Validators.required],
      logo: [this.empresa.logo, Validators.required],
      portada: [this.empresa.portada, Validators.required],
      direccion: [this.empresa.direccion, Validators.required],
      lat: [this.empresa.lat, Validators.required],
      lng: [this.empresa.lng, Validators.required],
      accountId: [this.empresa.acount_id],
      merchantId: [this.empresa.marchant_id],
      apiKey: [this.empresa.api_key],
    });
  }

  onSubmit() {
    this.empresa.lat = this.lat;
    this.empresa.lng = this.lng;
    this.loading = true;
    let empresa = {
      id: this.empresa.id,
      nombre: this.empresa.nombre, 
      nit: this.empresa.nit, 
      logo: this.empresa.logo, 
      portada: this.empresa.portada, 
      direccion: this.empresa.direccion, 
      lat: this.empresa.lat, 
      lng: this.empresa.lng, 
      merchantId: this.empresa.merchantId, 
      accountId: this.empresa.accountId, 
      apiKey: this.empresa.apiKey,  
    };
    
    let array = {
      empresa: empresa,
      correos: this.correos,
      telefonos: this.telefonos
    }
    this._EmpresaService.edit(this.file, array).subscribe(
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
    this.lat = $event.coords.lat;
    this.lng =  $event.coords.lng;
    this.getAddress(this.lat, this.lng);
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
    console.log('onLocationSelected:', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.getAddress(this.lat, this.lng);
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../services/evento.service';
import { environment } from '../../../../environments/environment' 

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  evento;
  publicidades;
  precios;
  valorTotal = 0;
  categorias = [];
  ulrImage = environment.ulrImage+"publicidad";
  ulr = environment.ulrImage+"publicidad";

  constructor(
    private rutaActiva: ActivatedRoute,
    private _EventoService: EventoService,
  ) { }

  ngOnInit() {
    let idEvento = this.rutaActiva.snapshot.params.idEvento;
    this._EventoService.show(idEvento).subscribe(
      response => { 
        if(response['status'] == 200){
          this.evento = response['data']['evento'];
          this.ulrImage = this.ulrImage+'/'+response['data']['evento']['publicidades'][0].url_imagen;
          this.publicidades = response['data']['evento']['publicidades'];
          this.precios = response['data']['precios'];
          response['data']['categorias'].forEach(element => {
            if(element.disponibles > 0){
             let array = {
               username: localStorage.getItem("username"),
               id: element.id, 
               nombre: element.nombre,
               valor: element.valor,
               boleta: 0,
               disponibles: element.disponibles
            }
            this.categorias.push(array);
            }
          });
   
          console.log(this.categorias);
        }
    }, error => {
      alert(error.error.error_description);
    })
  }

  onAdd(categoria){
    if(categoria.disponibles > 0){
      categoria.boleta++;
      categoria.disponibles--;
      this.valorTotal = this.valorTotal + parseInt(categoria.valor);
    }
  }

  onRemove(categoria){
    if (categoria.boleta != 0) {
      categoria.boleta--;
      categoria.disponibles++;
      this.valorTotal = this.valorTotal - parseInt(categoria.valor);
    }
  }

}

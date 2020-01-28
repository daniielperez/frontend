import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoteBoletaComponent } from './loteBoleta/loteBoleta.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LugarComponent } from './lugar/lugar.component';
import { EntradaComponent } from './entrada/entrada.component';
import { EventoComponent } from './cliente/evento/evento.component';
import { HomeComponent } from './cliente/home/home.component';
import { EventoConfigComponent } from './evento/evento.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';
import { PuntoVentaComponent } from './puntoVenta/puntoVenta.component';
import { VentaComponent } from './venta/venta.component';
import { PuntoVendedorComponent } from './puntoVendedor/puntoVendedor.component';
import { PrecioComponent } from './precio/precio.component';
import { PuntoEventoComponent } from './puntoEvento/puntoEvento.component';
import { EmpresaPerfilComponent } from './empresaPerfil/empresaPerfil.component';


const routes: Routes = [
    {
        path: 'categoria',
        component: LoteBoletaComponent
    },
    {
        path: 'empresa/:idUsuario',
        component: EmpresaComponent
    },
    {
        path: 'usuario',
        component: UsuarioComponent
    },
    {
        path: 'lugar',
        component: LugarComponent
    },
    {
        path: 'entrada/:idLugar',
        component: EntradaComponent
    },
    {
        path: 'cliente/evento/:idEvento',
        component: EventoComponent
    },
    {
        path: 'puntoVendedor/:idPuntoVenta',
        component: PuntoVendedorComponent
    },
    {
        path: 'precio/:idLoteBoleta',
        component: PrecioComponent
    },
    {
        path: 'cliente/home',
        component: HomeComponent
    },
    {
        path: 'empresaPerfil',
        component: EmpresaPerfilComponent
    },
    {
        path: 'cliente/perfil',
        component: PerfilComponent
    },
    {
        path: 'puntoVenta',
        component: PuntoVentaComponent
    },
    {
        path: 'venta',
        component: VentaComponent
    },
    {
        path: 'puntoEvento/:idEvento',
        component: PuntoEventoComponent
    },
    {
        path: 'eventoConfig/:idEmpresa',
        component: EventoConfigComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LugarComponent } from './lugar/lugar.component';
import { EntradaComponent } from './entrada/entrada.component';
import { EventoComponent } from './cliente/evento/evento.component';

const routes: Routes = [
    {
        path: 'categoria',
        component: CategoriaComponent
    },
    {
        path: 'empresa',
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
        path: 'evento/:idEvento',
        component: EventoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule { }

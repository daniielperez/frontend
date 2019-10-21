import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LugarComponent } from './lugar/lugar.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModulesRoutingModule { }

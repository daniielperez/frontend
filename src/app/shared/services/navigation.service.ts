import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from "../../services/local-store.service";

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    user:any;
    constructor(
        private store: LocalStoreService,
    ) {
        console.log(this.store.getItem("role"));
        this.publishNavigationChange();

    }

    defaultMenu: IMenuItem[] = [
        {   
            name: 'Dashboard',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            type: 'link',
            icon: 'i-Bar-Chart',
            state: '/dashboard/v1'
        },
        {
            name: 'Configuración',
            description: 'Configuración.',
            type: 'dropDown',
            icon: 'i-Gear',
            sub: [
                { icon: 'i-Business-Mens', name: 'Gestionar usuarios', state: '/modules/usuario', type: 'link' },
                { icon: 'i-Map-Marker', name: 'Gestionar lugares', state: '/modules/lugar', type: 'link' },
            ]
        },
        {
            name: 'Ventas',
            description: 'Ventas.',
            type: 'link',
            icon: 'i-Cash-register-2',
            state: '/modules/venta',
        },
        {
            name: 'Eventos',
            description: 'Eventos top.',
            type: 'link',
            icon: 'i-Home1',
            state: '/modules/cliente/home', 
        },
        {
            name: 'Perfil',
            description: 'Home.',
            type: 'link',
            icon: 'i-Business-Man',
            state: '/modules/cliente/perfil', 
        }
    ];

    empresaMenu: IMenuItem[] = [
        {
            name: 'Perfiles',
            description: 'Perfiles.',
            type: 'dropDown',
            icon: 'i-Business-Mens',
            sub: [
                { icon: 'i-Boy', name: 'Perfil cliente', state: '/modules/cliente/perfil', type: 'link' },
                { icon: 'i-Building', name: 'Perfil empresarial', state: '/modules/empresaPerfil', type: 'link' },
            ]
        },
        {   
            name: 'Lugares',
            description: 'Lugar donde se realizara el evento.',
            type: 'link',
            icon: 'i-Map-Marker',
            state: '/modules/lugar'
        },
        {
            name: 'Empresas',
            description: 'Mis empresas.',
            type: 'link',
            icon: 'i-Building',
            state: '/modules/empresa/'+this.store.getItem("idUsuario")
        },
        {
            name: 'Eventos',
            description: 'Eventos top.',
            type: 'link',
            icon: 'i-Home1',
            state: '/modules/cliente/home', 
        },
        {
            name: 'Ventas',
            description: 'Ventas.',
            type: 'link',
            icon: 'i-Cash-register-2',
            state: '/modules/venta',
        }
    ];

    vendedorMenu: IMenuItem[] = [
        {
            name: 'Ventas',
            description: 'Ventas.',
            type: 'link',
            icon: 'i-Cash-register-2',
            state: '/modules/venta',
        },
        {
            name: 'Eventos',
            description: 'Eventos top.',
            type: 'link',
            icon: 'i-Home1',
            state: '/modules/cliente/home', 
        },
        {
            name: 'Perfil',
            description: 'Home.',
            type: 'link',
            icon: 'i-Business-Man',
            state: '/modules/cliente/perfil', 
        }
    ];

    clienteMenu: IMenuItem[] = [
        {
            name: 'Eventos',
            description: 'Eventos top.',
            type: 'link',
            icon: 'i-Home1',
            state: '/modules/cliente/home', 
        },
        {
            name: 'Perfil',
            description: 'Home.',
            type: 'link',
            icon: 'i-Business-Man',
            state: '/modules/cliente/perfil', 
        }
    ];

    
    
    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();
    /* 
    You can customize this method to supply different menu for
    different user type. */
    publishNavigationChange() {
      switch (this.store.getItem("role")) {
        case 'ADMIN':
            this.menuItems.next(this.defaultMenu);
            break;
        case 'EMPRESA':
            this.menuItems.next(this.empresaMenu);
            break;
        case 'VENDEDOR':
            this.menuItems.next(this.vendedorMenu);
            break;
        case 'CLIENTE':
            this.menuItems.next(this.clienteMenu);
            break;
      }
    }
}

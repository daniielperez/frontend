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
                { icon: 'i-Building', name: 'Gestionar empresas', state: '/modules/empresa/'+this.store.getItem("idUsuario"), type: 'link' },
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


    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}

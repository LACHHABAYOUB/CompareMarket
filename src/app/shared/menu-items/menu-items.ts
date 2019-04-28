import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Cadastro',
        type: 'sub',
        icon: 'ti-layers-alt',
        children: [
          {
            state: 'mercado',
            name: 'Mercado',
          },
          {
            state: 'filial',
            name: 'Filial',
          },
          {
            state: 'fornecedor',
            name: 'Fornecedor'
          },
          {
            state: 'vendedor',
            name: 'Vendedor',
          }
        ]
      },
      {
        state: 'navigation',
        short_label: 'D',
        name: 'Cotações',
        type: 'link',
        icon: 'ti-bookmark-alt'
      },
      {
        state: 'widget',
        short_label: 'D ',
        name: 'Pedidos',
        type: 'link',
        icon: 'ti-package'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}

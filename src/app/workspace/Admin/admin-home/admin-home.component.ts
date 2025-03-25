import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  imports: [PanelMenu, BadgeModule, Ripple, CommonModule,RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {
              label: 'Mail',
              icon: 'pi pi-envelope',
              badge: '5',
              isActive:false,
              items: [
                  {
                      label: 'Compose',
                      icon: 'pi pi-file-edit',
                      shortcut: '⌘+N',
                      isActive:false,
                  },
                  {
                      label: 'Inbox',
                      icon: 'pi pi-inbox',
                      badge: '5',
                      isActive:false,
                  },
                  {
                      label: 'Sent',
                      icon: 'pi pi-send',
                      shortcut: '⌘+S',
                      isActive:false,
                  },
                  {
                      label: 'Trash',
                      icon: 'pi pi-trash',
                      shortcut: '⌘+T',
                      isActive:false,
                  }
              ]
          },
          {
              label: 'Reports',
              icon: 'pi pi-chart-bar',
              shortcut: '⌘+R',
              isActive:false,
              items: [
                  {
                      label: 'Sales',
                      icon: 'pi pi-chart-line',
                      badge: '3',
                      isActive:false,
                  },
                  {
                      label: 'Products',
                      icon: 'pi pi-list',
                      badge: '6',
                      isActive:false,
                  }
              ]
          },
          {
              label: 'Profile',
              icon: 'pi pi-user',
              shortcut: '⌘+W',
              isActive:false,
              items: [
                  {
                      label: 'Settings',
                      icon: 'pi pi-cog',
                      shortcut: '⌘+O',
                      isActive:false,
                  },
                  {
                      label: 'Privacy',
                      icon: 'pi pi-shield',
                      shortcut: '⌘+P',
                      isActive:false,
                  }
              ]
          }
      ];
  }

  toggleAll() {
      const expanded = !this.areAllItemsExpanded();
      this.items = this.toggleAllRecursive(this.items, expanded);
  }

  private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
      return items.map((menuItem) => {
          menuItem.expanded = expanded;
          if (menuItem.items) {
              menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
          }
          return menuItem;
      });
  }

  private areAllItemsExpanded(): boolean {
      return this.items.every((menuItem) => menuItem.expanded);
  }
}

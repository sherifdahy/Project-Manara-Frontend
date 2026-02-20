import { Injectable } from '@angular/core';

export interface Permission {
  key: string;
  name: string;
}

export interface Category {
  name: string;
  expanded: boolean;
  permissions: Permission[];
}

export interface ParsedPermissions {
  defaults: string[];
  active: string[];
  categories: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class BasePermissionService {

  parse(defaults: string[], overrides: string[]): ParsedPermissions {
    return {
      defaults,
      active: defaults.filter((p) => !overrides.includes(p)),
      categories: this.buildCategories(defaults),
    };
  }

  toggle(selected: string[], key: string): string[] {
    return selected.includes(key)
      ? selected.filter((k) => k !== key)
      : [...selected, key];
  }

  selectAll(
    selected: string[],
    categories: Category[],
    searchQuery: string
  ): string[] {
    const visible = this.getVisibleKeys(categories, searchQuery);
    return [...new Set([...selected, ...visible])];
  }

  deselectAll(
    selected: string[],
    categories: Category[],
    searchQuery: string
  ): string[] {
    const visible = this.getVisibleKeys(categories, searchQuery);
    return selected.filter((key) => !visible.includes(key));
  }


  getOverrides(defaults: string[], selected: string[]): string[] {
    return defaults.filter((p) => !selected.includes(p));
  }

  filterCategories(categories: Category[], searchQuery: string): Category[] {
    if (!searchQuery.trim()) return categories;

    return categories.filter(
      (cat) => this.getVisiblePermissions(cat, searchQuery).length > 0
    );
  }

  getVisiblePermissions(category: Category, searchQuery: string): Permission[] {
    if (!searchQuery.trim()) return category.permissions;

    const q = searchQuery.toLowerCase();
    return category.permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.key.toLowerCase().includes(q) ||
        category.name.toLowerCase().includes(q)
    );
  }

  getSelectedCount(category: Category, selected: string[]): number {
    return category.permissions.filter((p) => selected.includes(p.key)).length;
  }

  private buildCategories(keys: string[]): Category[] {
    const groupMap = new Map<string, Permission[]>();

    keys.forEach((key) => {
      const colonIndex = key.indexOf(':');
      if (colonIndex === -1) return;

      const group = key.substring(0, colonIndex).toLowerCase();
      const action = key.substring(colonIndex + 1);

      if (!groupMap.has(group)) {
        groupMap.set(group, []);
      }

      groupMap.get(group)!.push({
        key,
        name: this.formatName(action),
      });
    });

    const categories = Array.from(groupMap.entries()).map(
      ([_, permissions]) => ({
        name: this.formatName(
          permissions[0].key.substring(0, permissions[0].key.indexOf(':'))
        ),
        expanded: false,
        permissions,
      })
    );

    if (categories.length > 0) {
      categories[0].expanded = true;
    }

    return categories;
  }

  private formatName(value: string): string {
    return value
      .replace(/([A-Z])/g, ' \$1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  private getVisibleKeys(categories: Category[], searchQuery: string): string[] {
    return this.filterCategories(categories, searchQuery)
      .flatMap((c) => this.getVisiblePermissions(c, searchQuery))
      .map((p) => p.key);
  }
}

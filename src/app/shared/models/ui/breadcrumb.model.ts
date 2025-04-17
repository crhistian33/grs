import { MenuItem } from "primeng/api";

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface BreadcrumbStateModel {
  breadcrumbs: MenuItem[];
}

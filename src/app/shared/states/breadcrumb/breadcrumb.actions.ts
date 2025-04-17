import { Breadcrumb } from "@shared/models/ui/breadcrumb.model";
import { MenuItem } from "primeng/api";


export class BreadcrumbActions {
  static readonly type = '[Breadcrumb] Update';
  constructor(public breadcrumbs: MenuItem[]) {}
}

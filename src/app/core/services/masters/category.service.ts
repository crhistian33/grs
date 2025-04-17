import { Injectable } from '@angular/core';
import { Category, CategoryRequest } from '@models/masters/category.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category, CategoryRequest> {
  protected endpoint = 'categories';
}

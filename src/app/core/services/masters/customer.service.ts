import { Injectable } from '@angular/core';
import { Customer, CustomerResquest } from '@models/masters/customer.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer, CustomerResquest> {
  protected endpoint = 'customers';
}

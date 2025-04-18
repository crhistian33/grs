import { Injectable } from '@angular/core';
import { Company, CompanyResquest } from '@models/masters/company.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company, CompanyResquest> {
  protected endpoint = 'companies';
}

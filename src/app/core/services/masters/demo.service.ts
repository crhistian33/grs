import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demo, DemoResquest } from '@models/masters/demo.model';
import { BaseService } from '@shared/services/base/base.service';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DemoService extends BaseService<Demo, DemoResquest> {
  protected endpoint = 'demos';


  // protected getMockItems(): Demo[] {
  //   return this.demos;
  // }
}

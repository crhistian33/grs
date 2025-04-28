import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Worker } from '@models/masters/worker.model';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-renew',
  imports: [ReactiveFormsModule, ButtonModule, IftaLabelModule, DatePickerModule],
  templateUrl: './renew.component.html',
  styleUrl: './renew.component.scss'
})
export class RenewComponent implements OnInit {
  public config = inject(DynamicDialogConfig);
  worker!: Worker;

  ngOnInit(): void {
    this.worker = this.config.data.item;
  }
}

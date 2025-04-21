import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngxs/store';
import { AuthActions } from '@states/auth/auth.actions';
import { filter, Subject, take, takeUntil, tap } from 'rxjs';
import { AuthState } from '@states/auth/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule, InputIconModule, InputTextModule, IconFieldModule, IftaLabelModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  myForm: FormGroup;

  constructor() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.store.select(AuthState.getAuthenticated)
    .pipe(
      take(1),
      filter(isAuthenticated => isAuthenticated)
    )
    .subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  onSubmit() {
    if(this.myForm.valid) {
      const { email, password } = this.myForm.value;
      this.store.dispatch(new AuthActions.Login(email, password))
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.myForm.reset();
        })
      ).subscribe();
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../Services/Authentication/auth.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { STORED_KEYS } from '../../constants/storedKeys';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  flag: boolean = true;
  errorMessage: WritableSignal<string> = signal<string>('');
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  refSubscription: Subscription = new Subscription();

  loginForm!: FormGroup;

  loginFormIntialization(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
      ]),
    });
  }
  ngOnInit(): void {
    this.loginFormIntialization();
  }
  submitLoginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.refSubscription.unsubscribe();
      this.refSubscription = this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isLoading.set(false);
            this.loginForm.reset();
            this.errorMessage.set('');

            localStorage.setItem(STORED_KEYS.userToken, res.token);
            this.authService.decodeUserToken();
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Incorrect email or password',
      });
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.flag = !this.flag;
  }
}

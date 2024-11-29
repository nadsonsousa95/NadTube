import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    public loginForm:FormGroup;
    errorMessage: string = 'Login inválido';

    constructor(
      private fb:FormBuilder, 
      private loginService:LoginService,
      private router:Router,
      private toast:ToastrService
    ){
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

    onSubmit(): void {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.loginService.login(email, password).subscribe({
          next: (user) => {
            this.toast.success("Login efetuado com sucesso!");
            console.log('Login bem-sucedido:', user);
            this.router.navigate(['home']); // Redirecionar após login
          },
          error: (err) => {
            this.errorMessage = err.message;
          }
        });
      }
    }
  }

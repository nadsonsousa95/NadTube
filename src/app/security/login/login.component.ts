import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    public formLogin:FormGroup;

    constructor(
      private fb:FormBuilder, 
      private route:Router, 
      private toast:ToastrService){
      this.formLogin = this.criarFormLogin();
    }

    ngOnInit(): void {
      
    }

    public criarFormLogin():FormGroup{
      return this.fb.group({
        username:["", [Validators.required, Validators.minLength(6)]],
        password:["", [Validators.required, Validators.minLength(6)]]
      })
    }

    public isFormControlInvalid(controlName:string):boolean{
      return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched)
    }
    
     

}

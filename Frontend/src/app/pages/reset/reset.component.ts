import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit{
   resetForm !:FormGroup;
    fb = inject(FormBuilder);
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    authService = inject(AuthService);

    token !: string;

    ngOnInit(): void {
      this.resetForm = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    },
    {
        validator : confirmPasswordValidator('password','confirmPassword')
    }
    )

    this.activatedRoute.params.subscribe(val => {
        this.token = val['token'];
        console.log(this.token);
        })
    }


   reset()
   {
    let resetObj = {
      token : this.token,
      password: this.resetForm.value.password
    }
      this.authService.resetPasswordService(resetObj)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.resetForm.reset();
          this.router.navigate(['login']);
        },
        error: (err)=>{
          alert(err.error.message);
        }
       })
   }
}

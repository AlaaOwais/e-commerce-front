import { error } from 'console';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../core/services/forgot/forgot.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private readonly  forgotService= inject(ForgotService)
  private readonly  authService= inject(AuthService)
  private readonly  router= inject(Router)
  private readonly  platform_id= inject(PLATFORM_ID)
  step : number = 1;
  message : string ="";
  forgot :FormGroup = new FormGroup ({
    email:new FormControl(null, [Validators.required]),
  })
  verfiyCode :FormGroup = new FormGroup ({
    resetCode:new FormControl(null, [Validators.required]),
  })
  resetPassword :FormGroup = new FormGroup ({
    email:new FormControl(null, [Validators.required]),
    newPassword:new FormControl(null, [Validators.required]),
  })
  forgotPass(){
    let emailVlaue = this.forgot.get('email')?.value;
    this.resetPassword.get('email')?.patchValue (emailVlaue);
    this.forgotService.forgotPass(this.forgot.value).subscribe({
      next:(req)=>{
        if(req.statusMsg == "success" )
        {
          this.step = 2
        }
      },
      error:(req)=>{
        this.message = req.statusMsg
      }
    })
  }
  vcode(){
    // console.log('Sending reset code:', this.verfiyCode.value);
    this.forgotService.vcode(this.verfiyCode.value).subscribe({
      next:(req)=>{
        console.log(req)
        if(req.status == 'Success' )
        {
          this.step = 3
        }
      },
      error:(err)=>{
        this.message = err.error?.message || "Invalid or expired reset code"
      }
    })
  }

  reset(){
    this.forgotService.resetPass(this.resetPassword.value).subscribe({
      next:(req)=>{
        console.log(req)
          if (isPlatformBrowser(this.platform_id)){
            localStorage.setItem('myToken', req.token);
            this.authService.getuserData();
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 1000);
          }
      },
      error:(req)=>{
        this.message = req.statusMsg
      }
    })
  }
}

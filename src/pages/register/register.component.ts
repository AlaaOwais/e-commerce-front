import { Component, inject } from '@angular/core';
import { FormGroup,FormsModule , ReactiveFormsModule, FormControl, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error, log } from 'console';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  signUp :FormGroup = new FormGroup ({
    name:new FormControl(null, [Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/[\W]/)]),
    rePassword:new FormControl(null, [Validators.required]),
    phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]), 
  } , {validators: this.confirmPassword , updateOn :'blur'} )
  confirmPassword(groub:AbstractControl){
    const password = groub.get('password')?.value;
    const rePassword = groub.get('rePassword')?.value;
    return password === rePassword ?  null :  { mismatch: true };
  }
  isLoaded:boolean = false;
  signUpForm(){
      console.log(this.signUp.value)
    // if(this.signUp.valid){
      this.authService.signUpS(this.signUp.value).subscribe({
        next:(request)=>{
          console.log(request);
          this.isLoaded = true;
        },
        error:(err)=>{
          console.log(err)
          this.isLoaded = false;
        }
      })
    }
  }
// }


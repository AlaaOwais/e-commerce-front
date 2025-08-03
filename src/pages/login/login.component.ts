import { routes } from './../../app/app.routes';
import { Component, inject } from '@angular/core';
import { FormGroup,FormsModule , ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private readonly router = inject(Router)
logIn :FormGroup = new FormGroup ({
  email:new FormControl(null, [Validators.required, Validators.email]),
  password:new FormControl(null, [Validators.required]),
})
private readonly authService = inject(AuthService);
errMessage:string ='';
logInbtn(){
      this.authService.signIn(this.logIn.value).subscribe({
        next:(request)=>{
          console.log(request);
          localStorage.setItem('myToken', request.token);
          this.authService.getuserData();
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1000);
        },
        error:(err)=>{
          console.log(err)
          this.errMessage = err.message
        }
      })
    }
  }


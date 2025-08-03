import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/pay/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly paymentService = inject(PaymentService);
  cartId! :string
  paymentForm! : FormGroup;
  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
        details:[null ,[Validators.required]] ,
        phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]] ,
        city:[null ,[Validators.required]] ,
    })

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cartId =res.get('id')!
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  submitChekOutForm():void{
    console.log(this.paymentForm.value)
    this.paymentService.checkoutSession(this.cartId, this.paymentForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === "success")
        {
          open(res.session.url,'_self')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}

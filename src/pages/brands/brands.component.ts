import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../core/shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService)
  brands : IBrand[] =[]
  ngOnInit(): void {
    this.callbrands()
  }
  callbrands():void{
    this.brandService.getAllBrand().subscribe({
      next:(res)=>{
        this.brands=res.data
      }
    })
  }

}

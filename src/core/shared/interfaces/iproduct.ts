import { IBrand } from "./ibrand";
import { ICategory } from "./icategory";

export interface IProduct {
  sold: number;
  images: string[];
  // subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

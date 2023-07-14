import { ProductBriefDTO } from "./product.model";

export interface ICartItem {
  product: ProductBriefDTO,
  qty: number;
}
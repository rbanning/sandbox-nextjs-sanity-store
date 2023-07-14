import { ProductListItemDTO } from "./product.model";

export interface ICartItem {
  product: ProductListItemDTO,
  qty: number;
}
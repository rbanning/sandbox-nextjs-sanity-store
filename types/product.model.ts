import { _DocumentBaseModel } from "./_document-base-model";
import { _SanityContentBlockModel } from "./_sanity-content-block-model";
import { _SanityImageModel } from "./_sanity_image-model";
import { CommentDTO } from "./comment.model";


export interface ProductPropModel {
  sku: string;
  name: string;
  slug: string;
  releaseDate: Date;
  available?: boolean;
  featured?: boolean;
  brief: string;
  price: number;
  image: _SanityImageModel;
  content: _SanityContentBlockModel;
}

export type ProductModel = _DocumentBaseModel & ProductPropModel;

//-- name:  ProductListItemDTO
//-- desc:  Used for listing Products.  
export type ProductListItemDTO = Pick<ProductModel, 
  'sku' | 'name' | 'slug' | 'brief' | 'price' | 
  'available' | 'featured' | 'image'>;

//--  name: ProductDetailDTO
//--  desc: Used to display a Product
//--        All of the _DocumentBaseModel props are optional and may not be present
export type ProductDetailDTO = ProductPropModel 
  & Partial<_DocumentBaseModel>
  & { comments?: CommentDTO[] };


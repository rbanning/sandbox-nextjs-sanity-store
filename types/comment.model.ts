import { _DocumentBaseModel } from "./_document-base-model";

export interface CommentPropModel {
  name: string;
  email: string;
  approved?: boolean;
  stars: number;
  title: string;
  comment: string;
  product: {_ref: string}
}

export type CommentModel = _DocumentBaseModel & CommentPropModel;

//-- name:  CommentDTO
//-- desc:  Used as part of the comments field in ProductDetailDTO.  
export type CommentDTO = Pick<CommentModel, 
  '_id' | 'name' | 'email' | 'stars' | 'title' | 'comment' | '_createdAt'>;


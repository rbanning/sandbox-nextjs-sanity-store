import comment from "./schemas/comment";
import product from "./schemas/product-schema";
import project from "./schemas/project-schema";
import { ratingType } from "./schemas/rating-field";
import user from "./schemas/user";

const schemaTypes = [
  product,
  comment,
  project,  
  user,

  //helpers
  ratingType
];

export default schemaTypes;
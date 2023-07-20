import comment from "./schemas/comment";
import product from "./schemas/product-schema";
import project from "./schemas/project-schema";
import { ratingType } from "./schemas/rating-field";

const schemaTypes = [
  product,
  comment,
  project,  


  //helpers
  ratingType
];

export default schemaTypes;
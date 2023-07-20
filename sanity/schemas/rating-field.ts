import { defineType } from 'sanity';
import { RatingInput } from '../components/rating/rating-input';

export const ratingType = defineType({
  name: 'rating',
  title: 'Rating',
  type: 'number',
  validation: (rule: any) => rule.min(1).max(5),
  components: {input: RatingInput}
})
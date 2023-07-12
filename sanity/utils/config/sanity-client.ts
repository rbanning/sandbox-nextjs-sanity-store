import {createClient} from 'next-sanity';
import { configBase } from './config-base';

export const sanityClient = createClient({
  ...configBase, 
  useCdn: true, 
});

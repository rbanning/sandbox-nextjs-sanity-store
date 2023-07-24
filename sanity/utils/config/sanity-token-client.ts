import {createClient} from 'next-sanity';
import { configBaseWithToken } from './config-base';

export const sanityTokenClient = createClient({
  ...configBaseWithToken, 
  useCdn: false, 
});

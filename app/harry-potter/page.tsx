import { IHarryPotterName } from "@/data/harry-potter.models";

import { store } from '@/store';
import { setStartupNames } from "@/store/features/harry-potter/harry-potter-searchSlice";

import HarryPotterSearchInput from "@/components/harry-potter-search-input";
import HarryPotterPreloader from "@/components/harry-potter-preloader";

const URL = {  
  names: 'http://localhost:4200/api/harry-potter/names?count=1000',
  search: 'https://localhost:4200/api/harry-potter/search'
}
export default async function HarrySearch() {
  const req = await fetch(URL.names);
  const names = (await req.json()) as IHarryPotterName[];
  store.dispatch(setStartupNames(names));

  return (
    <main className="max-w-md mx-auto my-8">
      <HarryPotterPreloader names={names} />  {/* move the names over to the client side  */}
      <HarryPotterSearchInput />
    </main>
  )
}
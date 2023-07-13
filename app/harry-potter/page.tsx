import { IHarryPotterName } from "@/data/harry-potter.models";
import { normalize } from "@/data/utils";
import Link from "next/link";

const URL = {  
  names: 'http://localhost:4200/api/harry-potter/names?count=1000',
  search: 'https://localhost:4200/api/harry-potter/search'
}
export default async function HarrySearch() {
  const req = await fetch(URL.names);
  const names = (await req.json()) as IHarryPotterName[];

  return (
    <main className="max-w-md mx-auto">
      {names && names.map((obj, index) => (
        <Link
          key={obj.id} 
          href={`/harry-potter/${normalize(obj.name)}`} 
          className="block my-4 text-xl font-semibold">
            <span className="inline-block text-slate-700 font-mono my-4">({index+1})</span>
          {obj.name}
        </Link>
      ))}
    </main>
  )
}
import { IHarryPotterBrief } from "@/data/harry-potter.models";
import Link from "next/link";

type Props = {
  params: { name: string }
}

const URL = {  
  detail: 'http://localhost:4200/api/harry-potter',
  search: 'https://localhost:4200/api/harry-potter/search'
}
export default async function HarryPotterDetail({params}: Props) {
  const { name } = params;
  const req = await fetch(`${URL.detail}?name=${encodeURI(name)}`);
  const detail = req.ok ? (await req.json()) as IHarryPotterBrief : null;

  const fieldNames = ['species', 'gender', 'yearOfBirth', 
    'wizard', 'ancestry', 'hogwartsStudent', 
    'hogwartsStaff', 'house', 'alive'];

  return (
    <main className="max-w-md mx-auto">
      {detail && (
        <>
        <h1 className="text-3xl my-4">{detail.name}</h1>

        <h3 className="text-amber-800 font-light uppercase">Alternative Names</h3>
        <p className="text-xl mx-2 mb-4">
          {detail.alternate_names.length === 0 && (
            <span className="text-sm">(none)</span>
          )}
          {detail.alternate_names.length > 0 && detail.alternate_names.map((n, i) => (
            <span key={`${detail.id}-name-${i}`} className="mr-4">{n}</span>
          ))}
        </p>

        {fieldNames.map((prop) => {

          let value = '';
          let found = false;
          const data = (detail as any)[prop];
          if (data === null || data === '') {
            value = '(n/a)';
          } else if (data === undefined) {
            value = '(undefined)';
          } else {
            value = `${data}`; //convert to string
            found = true;
          }
          return (
          <div key={prop} className="mb-4">
            <h3 className="text-amber-800 font-light uppercase">{prop}</h3>
            <p className="text-xl mx-2">
              <span className={found ? '' : 'text-sm'}>{value}</span>
            </p>
          </div>
        )})}

        </>
      )}
      {!detail && (
        <>
        <h1 className="text-3xl my-4 text-rose-700">Oops...</h1>
        <p className="text-rose-500">
          We were not able to find the character that you requested
        </p>
        <p className="text-mono text-rose-500">
          Name = {name || '(n/a)'}
        </p>
        </>
      )}

      <div className="my-8">
        <Link href="/harry-potter" className="border-2 border-slate-300 rounded py-2 px-4 text-xl">Back</Link>
      </div>

    </main>
  )
}
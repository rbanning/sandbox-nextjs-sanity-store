import { NextRequest, NextResponse } from "next/server";

import harryData from '@/data/harry-potter.json';
import { CompareHarryPotterMethods, CompareHarryPotterOrder, anyToHarryPotterName, compareHarryPotterRecords } from "@/data/harry-potter.models";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get('name') ?? '').toLocaleLowerCase();
  const count = parseInt((searchParams.get('count') ?? '10')) ?? 10;
  const sort = (searchParams.get('sort') ?? 'name') as CompareHarryPotterMethods;
  const order = (searchParams.get('order') ?? 'ASC') as CompareHarryPotterOrder;

  const data = harryData
          .filter(h => h.name.toLocaleLowerCase().includes(name) && h[sort])
          .map(h => anyToHarryPotterName(h));
  data.sort(compareHarryPotterRecords(sort, order));

  return NextResponse.json(data.slice(0, count));
}
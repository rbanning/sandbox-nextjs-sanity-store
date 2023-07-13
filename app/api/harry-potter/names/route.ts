import { NextRequest, NextResponse } from "next/server";

import harryData from '@/data/harry-potter.json';
import { CompareHarryPotterMethods, CompareHarryPotterOrder, anyToHarryPotterName, compareHarryPotterRecords } from "@/data/harry-potter.models";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = parseInt((searchParams.get('count') ?? '100000')) ?? 100000;  //default to all
  const sort = (searchParams.get('sort') ?? 'name') as CompareHarryPotterMethods;
  const order = (searchParams.get('order') ?? 'ASC') as CompareHarryPotterOrder;


  const data = harryData
          .filter(h => h[sort]) //must contain the field being referenced in the sort
          .map(h => anyToHarryPotterName(h));
  data.sort(compareHarryPotterRecords(sort, order));
  
  return NextResponse.json(data.slice(0, count));
}
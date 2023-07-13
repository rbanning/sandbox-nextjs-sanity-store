import { NextRequest, NextResponse } from "next/server";

import harryData from '@/data/harry-potter.json';
import { CompareHarryPotterMethods, CompareHarryPotterOrder, IHarryPotterBrief, anyToHarryPotterBrief, anyToHarryPotterName, compareHarryPotterRecords } from "@/data/harry-potter.models";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = parseInt((searchParams.get('count') ?? '100000')) ?? 100000;  //default to all

  const no_house = '(n/a)';

  type Houses = Record<string, IHarryPotterBrief[]>;
  const allMembers = harryData.map(h => anyToHarryPotterBrief(h));
  allMembers.sort(compareHarryPotterRecords('name'));

  const data = harryData.reduce((obj, h, index, array) => {
    const house = h.house || no_house;
    if (!obj[house]) {
      const members = array.filter(m => m.house === h.house);
      obj[house] = members.slice(0, count);
    }
    return obj;
  }, {} as Houses);
  
  return NextResponse.json(data);
}
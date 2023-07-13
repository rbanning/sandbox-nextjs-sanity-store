import { NextRequest, NextResponse } from "next/server";

import harryData from '@/data/harry-potter.json';
import { anyToHarryPotterBrief, anyToHarryPotterName } from "@/data/harry-potter.models";
import { normalize } from "@/data/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = normalize((searchParams.get('name')) ?? '');

  if (name) {

  }

  const data = name 
      ? anyToHarryPotterBrief(
          harryData
            .find(h => normalize(h.name) === name)
        )
      : harryData
          .map(h => anyToHarryPotterName(h));
  
  return NextResponse.json(data ?? null);
}
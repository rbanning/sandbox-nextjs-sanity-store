import { NextRequest, NextResponse } from "next/server";
import { sanityTokenClient } from "@/sanity/utils/config/sanity-token-client";
import { omit } from "@/lib";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { productId } = data;

  //todo: send to Sanity
  try {
    const result = await sanityTokenClient.create({
      _type: 'comment',
      ...omit(data, 'productId'),
      product: {
        _type: 'reference',
        _ref: productId,
      },
    });

   return NextResponse.json({ result });

  } catch (error) {
    return new NextResponse(JSON.stringify({message: 'Problem submitting the comment', error}), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

}
"use client";

import { NextStudio } from "next-sanity/studio";
import { sanityConfig } from "@/lib";

export function Studio() {
  return <NextStudio config={sanityConfig} />
}
import type { Metadata } from "next";
import { metadata as studioMetadata } from 'next-sanity/studio/metadata';

import { Studio } from "./studio";

export const metadata: Metadata = {
  ...studioMetadata,
  viewport: `${studioMetadata.viewport}, interactive-widget=resizes-content`, //override
}

export default function AdminPage() {
  return (
    <Studio />
  )
}
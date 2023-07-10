"use client";
//next js 13 wants to render everything on server but this is an app


import { NextStudio } from 'next-sanity/studio';
import { sanityConfig } from '@/lib';

export default function AdminPage() {
  return (
    <NextStudio config={sanityConfig} />
  )
}
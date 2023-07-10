import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import { defineConfig } from 'sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '';

export const sanityConfig = defineConfig({
  projectId,
  dataset,
  apiVersion,

  title: 'Sandbox Store Studio',
  basePath: '/admin-studio',

  plugins: [deskTool(), visionTool()],
})
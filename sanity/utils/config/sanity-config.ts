import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import { defineConfig } from 'sanity';


import schemaTypes from '@/sanity/schema';
import { configBase } from './config-base';

export const sanityConfig = defineConfig({
  ...configBase,

  title: 'Sandbox Store Studio',
  basePath: '/admin-studio',

  plugins: [deskTool(), visionTool()],

  schema: { types: schemaTypes }
})
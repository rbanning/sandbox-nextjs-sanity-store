import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import { defineConfig } from 'sanity';


import schemaTypes from '@/sanity/schema';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { configBase } from './config-base';

export const sanityConfig = defineConfig({
  ...configBase,

  title: 'Sandbox Store Studio',
  basePath: '/admin-studio',

  plugins: [deskTool(), visionTool(), unsplashImageAsset()],

  schema: { types: schemaTypes }
});
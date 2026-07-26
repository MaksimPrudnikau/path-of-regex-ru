import { query } from '@solidjs/router'
import type { maps } from '@/generated/prisma/browser'
import { prisma } from '~/api/db'

export const getMapMods = query(() => {
  "use server";

  return prisma.maps.findMany();
}, "getMapMods");

export type MapMod = maps;

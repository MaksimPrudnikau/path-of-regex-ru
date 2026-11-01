import snapshot from "@/data/bestiary-prices.json";
import type { PriceSnapshot } from "~/lib/prices";

export const savedSnapshot: PriceSnapshot = { ...snapshot, isLive: false };

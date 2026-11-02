import snapshot from "@/data/fragments-prices.json";
import type { PriceSnapshot } from "~/lib/prices";

export const savedSnapshot: PriceSnapshot = { ...snapshot, isLive: false };

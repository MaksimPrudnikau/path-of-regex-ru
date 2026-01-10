import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schemas";

const connectionString = import.meta.env.VITE_DATABASE_URL;

const client = postgres(connectionString as string, { prepare: true });
export const db = drizzle(client, { schema });

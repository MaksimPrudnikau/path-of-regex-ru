export default {
  // driver: "better-sqlite",
  dbCredentials: {
    url: "./drizzle/db.sqlite",
  },
  dialect: "sqlite",
  out: "./drizzle/migrations/",
  schema: "./drizzle/schemas/",
};

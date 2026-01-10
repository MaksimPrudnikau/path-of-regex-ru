export default {
  // driver: "better-sqlite",
  dbCredentials: {
    url: "",
  },
  dialect: "postgresql",
  out: "./drizzle/migrations/",
  schema: "./drizzle/schemas/",
};

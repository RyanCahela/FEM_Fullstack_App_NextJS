import { PrismaClient } from "@prisma/client";

/*
  Because nextJS runs in a serveless environment it helps to 
  cache the DB connection to save on usage limitations of from the
  serverless hosting company.

  Reference
  https://frontendmasters.com/courses/fullstack-app-next-v2/sync-schema-setup-prisma-client/
  at 3 Minutes 20 Seconds
*/

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }

  prisma = global.cachedPrisma;
}

export const db = prisma;
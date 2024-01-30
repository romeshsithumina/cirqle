import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
// used because next js hot reloading can create multiple instances of prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

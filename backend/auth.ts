import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { adminAc, userAc } from "better-auth/plugins/admin/access";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./src/generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:3000"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
      roles: {
        USER: userAc,
        ADMIN: adminAc,
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});

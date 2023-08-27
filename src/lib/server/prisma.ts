import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

const prisma = global.__prisma || new PrismaClient();

if (dev) {
	global.__prisma = prisma;
}

export { prisma };

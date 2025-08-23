import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  try {
    return await db.query.users.findFirst({
      where: eq(users.id, userId)
    });
  } catch (error) {
    console.log("[GET USER BY ID ERROR] : ", error);
    return null
  }
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  });
}


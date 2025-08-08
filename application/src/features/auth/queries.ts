import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string){
  return await db.query.users.findFirst({
    where: eq(users.id, userId)
  });
}

export async function getUserByEmail(email: string){
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  });
}


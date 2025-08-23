import { db } from "@/db/index";

import { usersSchema } from "./schemas";

export async function getUsers() {
  const usersInfo = await db.query.users.findMany()
  return usersSchema.parse(usersInfo)
}

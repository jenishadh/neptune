import { eq } from "drizzle-orm";

import { db } from "@/db/index";
import { songs } from "@/db/schema";

export async function getSongs() {
  return await db.query.songs.findMany()
}

export async function getSong(songId: string) {
  try {
    return await db.query.songs.findFirst({
      where: eq(songs.id, songId)
    })
  } catch (error) {
    console.log("[GET SONG ERROR] : ", error);
    return null
  }
}

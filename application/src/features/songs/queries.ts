import { db } from "@/db/index";
import { songs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSong(songId: string){
  return await db.query.songs.findFirst({
    where: eq(songs.id, songId)
  })
}

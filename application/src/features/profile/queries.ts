import { db } from "@/db/index";
import { savedSongs, songs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSavedSongs(userId: string) {
  // Join savedSongs with songs to get song details
  return await db
    .select({
      id: songs.id,
      title: songs.title,
      artist: songs.artist,
      album: songs.album,
      year: songs.year,
      duration: songs.duration,
      genre: songs.genre,
      url: songs.url,
    })
    .from(savedSongs)
    .innerJoin(songs, eq(savedSongs.songId, songs.id))
    .where(eq(savedSongs.userId, userId));
}
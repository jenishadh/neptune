
import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { getSong } from "@/features/songs/queries"
import SongClient from '@/features/songs/components/song-client'
import { verifySession } from '@/lib/session';
import { db } from '@/db/index';
import { savedSongs } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { RecommendedSongs } from '@/features/songs/components/recommended-songs';
import { recommendSongs } from '@/features/songs/actions';

export default async function SongPage({ params }: { params: Promise<{ songId: string }> }) {
  const { songId } = await params;
  const result = await getSong(songId);
  const { userId } = await verifySession()
  const songs = await recommendSongs(songId);

  const formattedSongs = songs.map((item) => ({
    id: item.song.id,
    title: item.song.title,
    artist: item.song.artist,
    similarity: item.similarity
  }))

  if (!result) return <div className="text-center py-20 text-gray-500">Song not found.</div>;

  const song = {
    id: songId,
    userId: userId!,
    title: result.title,
    artist: result.artist,
    album: result.album,
    year: result.year,
    duration: result.duration,
    genre: result.genre,
    url: result.url
  }

  // Check if already saved
  const [alreadySaved] = await db
    .select()
    .from(savedSongs)
    .where(
      and(
        eq(savedSongs.userId, userId!),
        eq(savedSongs.songId, songId)
      )
    );

  return (
    <section className='py-6 md:py-10'>
      <MaxWidthWrapper className="space-y-6">
        <SongClient song={song} isAlreadySaved={!!alreadySaved} />
        <RecommendedSongs songs={formattedSongs} />
      </MaxWidthWrapper>
    </section>
  )
}
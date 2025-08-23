import z from "zod";
import { songs } from '@/db/schema'

export const songSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  artist: z.string().min(1, { message: "Please enter an artist" }),
  album: z.string().min(1, { message: "Please enter an album" }),
  genre: z.string().min(1, { message: "Please enter a genre" }),
  year: z.string().min(1, { message: "Please enter a year" }),
  duration: z.string().min(1, { message: "Please enter a duration" }),
  url: z.url({ message: "Please enter a valid url" }),
})

export type SongFormValues = z.infer<typeof songSchema>

export type Song = typeof songs.$inferSelect

export type SongColumn = {
  id: string
  title: string
  artist: string
  album: string
  genre: string
  year: string
  duration: string
  url: string
}

export type CellActionProps = {
  data: SongColumn
}

export type SongClientProps = {
  data: SongColumn[]
}

export const updateSongSchema = songSchema.extend({
  id: z.string(), 
});
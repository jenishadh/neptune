import z from "zod";

export const saveSongSchema = z.object({
  userId: z.string().min(1, { message: "Please enter the id" }),
  songId: z.string().min(1, { message: "Please enter the id" }),
})

export const songSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Please enter a title" }),
  artist: z.string().min(1, { message: "Please enter an artist" }),
  similarity: z.number(),
})

export type SongSchema = z.infer<typeof songSchema>
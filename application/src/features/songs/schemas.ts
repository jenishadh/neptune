import z from "zod";

export const saveSongSchema = z.object({
  userId: z.string().min(1, { message: "Please enter the id" }),
  songId: z.string().min(1, { message: "Please enter the id" }),
})
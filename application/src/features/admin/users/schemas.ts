import z from "zod";

import { users } from '@/db/schema'

export const usersSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"]),
  createdAt: z.date(),
  updatedAt: z.date(),
}))

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"]),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserFormValues = z.infer<typeof userSchema>

export const editUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"])
})

export const updateUserSchema = editUserSchema.extend({
  id: z.string(), 
});

export type User = typeof users.$inferSelect

export type UserColumn = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  createdAt: string
  updatedAt: string
}

export type CellActionProps = {
  data: UserColumn
}

export type UserClientProps = {
  data: UserColumn[]
}

export type EditUserFormProps = {
  data: {
    id: string
    name: string
    email: string
    role: "user" | "admin"
    createdAt: string
    updatedAt: string
  }
}
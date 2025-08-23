"use server"

import z from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/db/index";
import { users } from "@/db/schema";

import { updateUserSchema } from "./schemas";

export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  try {
    // 1. Validate input
    const validatedFields = updateUserSchema.safeParse(data);
    if (!validatedFields.success) {
      return { success: false, message: "Invalid form fields" };
    }

    const { id, name, email, role } =
      validatedFields.data;

    // 2. Update the song in the database
    const user = await db
      .update(users)
      .set({
        name,
        email,
        role
      })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    const updatedUser = user[0];
    if (!updatedUser) {
      return {
        success: false,
        message: "User not found or update failed.",
      };
    }

    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    console.error("[UPDATE USER ERROR] : ", error);
    throw new Error("Failed to update user! Please try again.");
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id) {
      return { success: false, message: "User ID is required." };
    }

    const deleted = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    const deletedUser = deleted[0];
    if (!deletedUser) {
      return { success: false, message: "User not found or already deleted." };
    }

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error("[DELETE USER ERROR] : ", error);
    throw new Error("Failed to user song! Please try again.");
  }
}
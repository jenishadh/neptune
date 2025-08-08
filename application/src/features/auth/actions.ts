"use server"

import z from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";

import { createSession, deleteSession } from "@/lib/session";

import { loginSchema, registerSchema } from "./schemas";
import { getUserByEmail } from "./queries";

export async function login(data: z.infer<typeof loginSchema>) {
  try {
    // 1. Validate form fields
    const validatedFields = loginSchema.safeParse(data);

    const errorMessage = { message: 'Invalid login credentials.' };

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        message: "Invalid form fields",
      };
    }

    const { email, password } = validatedFields.data;

    // 2. Query the database for the user with the given email
    const user = await getUserByEmail(email);

    // If user is not found, return early
    if (!user) {
      return errorMessage;
    }
    // 3. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    // If the password does not match, return early
    if (!passwordMatch) {
      return errorMessage;
    }

    const userId = user.id.toString();
    const userRole = user.role;
    // 4. If login successful, create a session for the user and redirect
    await createSession(userId, userRole);

  } catch (error) {
    console.log('[LOGIN ERROR] : ', error);
    throw new Error('Failed to login! Please try again.');
  }

  redirect('/');
}


export async function register(data: z.infer<typeof registerSchema>) {
  try {
    // 1. Validate form fields
    const validatedFields = registerSchema.safeParse(data);
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return { message: "Invalid form fields" };
    }

    const { name, email, password } = validatedFields.data;

    // 2. Query the database for the user with the given email
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        success: false,
        message: 'Email already exists, please use a different email or login.'
      };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 4. Insert the user into the database
    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword
      })
      .returning({ id: users.id });

    const currentUser = user[0];
    // If user is not found, return early
    if (!currentUser) {
      return {
        success: false,
        message: 'An error occurred while creating your account.'
      };
    }

    return {
      success: true,
      message: "Registration successful! Login to continue."
    };

  } catch (error) {
    console.error('[REGISTER ERROR] : ', error);
    throw new Error('Failed to register! Please try again.');
  }
}

export async function logout() {
  await deleteSession();
}
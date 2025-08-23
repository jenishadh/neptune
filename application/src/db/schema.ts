import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// User Roles Enum
export const userRole = pgEnum("user_role", ["user", "admin"]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRole("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Songs Table
export const songs = pgTable("songs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album").notNull(),
  genre: text("genre").notNull(),
  year: text("year").notNull(),
  duration: text("duration").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
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

// Saved Songs Table
export const savedSongs = pgTable("saved_songs", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  songId: uuid("song_id")
    .notNull()
    .references(() => songs.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (table) => [
  primaryKey({ columns: [table.userId, table.songId] })
]);

// User Relations: One User has Many SavedSongs
export const userRelations = relations(users, ({ many }) => ({
  userSongs: many(savedSongs),
}));

// Song Relations: One Song can be in Many SavedSongs
export const songRelations = relations(songs, ({ many }) => ({
  userSongs: many(savedSongs),
}));

// SavedSongs Relations: A single entry in savedSongs links One User to One Song
export const savedSongsRelations = relations(savedSongs, ({ one }) => ({
  user: one(users, {
    fields: [savedSongs.userId],
    references: [users.id],
  }),
  song: one(songs, {
    fields: [savedSongs.songId],
    references: [songs.id],
  }),
}));

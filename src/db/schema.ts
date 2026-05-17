import { integer, pgTable, varchar, text, real, smallint, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const exercisesTable = pgTable("exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const workoutsTable = pgTable("workouts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  date: timestamp({ withTimezone: true }).notNull().defaultNow(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const workoutExercisesTable = pgTable("workout_exercises", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workout_id: integer().notNull().references(() => workoutsTable.id, { onDelete: "cascade" }),
  exercise_id: integer().notNull().references(() => exercisesTable.id),
  position: smallint().notNull(),
  started_at: timestamp({ withTimezone: true }),
  ended_at: timestamp({ withTimezone: true }),
  notes: text(),
});

export const setsTable = pgTable("sets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  workout_exercise_id: integer().notNull().references(() => workoutExercisesTable.id, { onDelete: "cascade" }),
  set_number: smallint().notNull(),
  reps: integer().notNull(),
  weight_kg: real(),
  rpe: real(),
  notes: text(),
});

export type Workout = typeof workoutsTable.$inferSelect;
export type NewWorkout = typeof workoutsTable.$inferInsert;

export type Exercise = typeof exercisesTable.$inferSelect;
export type NewExercise = typeof exercisesTable.$inferInsert;

export type WorkoutExercise = typeof workoutExercisesTable.$inferSelect;
export type NewWorkoutExercise = typeof workoutExercisesTable.$inferInsert;

export type Set = typeof setsTable.$inferSelect;
export type NewSet = typeof setsTable.$inferInsert;

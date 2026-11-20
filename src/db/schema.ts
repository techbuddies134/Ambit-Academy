import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export type ProductColor = { name: string; hex: string };

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    collection: text("collection").notNull().default("core"),
    price: integer("price").notNull(),
    compareAtPrice: integer("compare_at_price"),
    shortDescription: text("short_description").notNull(),
    description: text("description").notNull(),
    details: jsonb("details").$type<string[]>().notNull().default([]),
    materials: text("materials").notNull().default(""),
    care: text("care").notNull().default(""),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
    colors: jsonb("colors").$type<ProductColor[]>().notNull().default([]),
    badge: text("badge"),
    featured: boolean("featured").notNull().default(false),
    stock: integer("stock").notNull().default(24),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("5.0"),
    reviewCount: integer("review_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("products_slug_idx").on(table.slug)],
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    customerName: text("customer_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postalCode: text("postal_code").notNull().default(""),
    country: text("country").notNull().default("Pakistan"),
    notes: text("notes").notNull().default(""),
    subtotal: integer("subtotal").notNull(),
    shipping: integer("shipping").notNull().default(0),
    total: integer("total").notNull(),
    status: text("status").notNull().default("confirmed"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("orders_number_idx").on(table.orderNumber)],
);

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  image: text("image").notNull().default(""),
  size: text("size").notNull().default("M"),
  color: text("color").notNull().default(""),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  author: text("author").notNull(),
  rating: integer("rating").notNull().default(5),
  title: text("title").notNull().default(""),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable(
  "subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("subscribers_email_idx").on(table.email)],
);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull().default("General"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Review = typeof reviews.$inferSelect;

// Academy data is separate from the archived shop's records.
export const academyPrograms = pgTable("academy_programs", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  gradeFrom: integer("grade_from").notNull(),
  gradeTo: integer("grade_to").notNull(),
  stage: text("stage").notNull(),
  summary: text("summary").notNull(),
  introduction: text("introduction").notNull(),
  subjects: jsonb("subjects").$type<string[]>().notNull(),
  outcomes: jsonb("outcomes").$type<string[]>().notNull(),
  sessions: jsonb("sessions").$type<{ days: string; time: string; focus: string }[]>().notNull(),
  duration: integer("duration").notNull(),
  image: text("image").notNull(),
  theme: text("theme").notNull(),
  position: integer("position").notNull(),
});

export const academyEnquiries = pgTable("academy_enquiries", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  guardian: text("guardian").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  grade: integer("grade").notNull(),
  programSlug: text("program_slug").notNull().references(() => academyPrograms.slug),
  interest: text("interest").notNull(),
  preference: text("preference").notNull(),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("Received"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AcademyProgram = typeof academyPrograms.$inferSelect;

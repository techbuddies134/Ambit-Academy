CREATE TABLE "academy_enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" text NOT NULL,
	"guardian" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"grade" integer NOT NULL,
	"program_slug" text NOT NULL,
	"interest" text NOT NULL,
	"preference" text NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'Received' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "academy_enquiries_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "academy_programs" (
	"slug" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"grade_from" integer NOT NULL,
	"grade_to" integer NOT NULL,
	"stage" text NOT NULL,
	"summary" text NOT NULL,
	"introduction" text NOT NULL,
	"subjects" jsonb NOT NULL,
	"outcomes" jsonb NOT NULL,
	"sessions" jsonb NOT NULL,
	"duration" integer NOT NULL,
	"image" text NOT NULL,
	"theme" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text DEFAULT 'General' NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"size" text DEFAULT 'M' NOT NULL,
	"color" text DEFAULT '' NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_number" text NOT NULL,
	"customer_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"postal_code" text DEFAULT '' NOT NULL,
	"country" text DEFAULT 'Pakistan' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"subtotal" integer NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"status" text DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"collection" text DEFAULT 'core' NOT NULL,
	"price" integer NOT NULL,
	"compare_at_price" integer,
	"short_description" text NOT NULL,
	"description" text NOT NULL,
	"details" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"materials" text DEFAULT '' NOT NULL,
	"care" text DEFAULT '' NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sizes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"colors" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"badge" text,
	"featured" boolean DEFAULT false NOT NULL,
	"stock" integer DEFAULT 24 NOT NULL,
	"rating" numeric(2, 1) DEFAULT '5.0' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"author" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "academy_enquiries" ADD CONSTRAINT "academy_enquiries_program_slug_academy_programs_slug_fk" FOREIGN KEY ("program_slug") REFERENCES "public"."academy_programs"("slug") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "orders_number_idx" ON "orders" USING btree ("order_number");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
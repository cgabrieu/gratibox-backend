CREATE TYPE plan_type AS ENUM('Monthly', 'Weekly');

CREATE TYPE option_name AS ENUM('Chás', 'Incensos', 'Produtos Orgânicos');

CREATE TYPE day_month AS ENUM('1', '10', '20');

CREATE TYPE day_week AS ENUM('Segunda', 'Quarta', 'Sexta');




CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	"password" varchar(70) NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "addresses" (
	"id" serial NOT NULL UNIQUE,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL UNIQUE,
	"zip_code" varchar(8) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscriptions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"plan_type" plan_type NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"day_month" day_month,
	"day_week" day_week,
	CONSTRAINT "subscriptions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "receiving_option" (
	"id" serial NOT NULL,
	"subscription_id" integer NOT NULL,
	"option_name" option_name NOT NULL,
	CONSTRAINT "receiving_option_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "receiving_option" ADD CONSTRAINT "receiving_option_fk0" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id");









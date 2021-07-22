import pg from 'pg'

const {Pool} = pg

const databaseConfig={
    user:'postgres',
    password:'123456',
    port:5432,
    database:''
}

const connection = 


CREATE TABLE "recomendations" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"youtubeLink" TEXT NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "Songs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





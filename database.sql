CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    name VARCHAR (200),
    is_admin BOOLEAN NOT NULL DEFAULT 'false',
    date_joined DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES "public"."person"("id") ON DELETE CASCADE,
    date_posted DATE NOT NULL DEFAULT NOW(),
    lunch_complete BOOLEAN NOT NULL DEFAULT 'false',
    activity_complete BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    date_posted DATE NOT NULL DEFAULT NOW(),
    comments VARCHAR(2000) NOT NULL,
    person_id INT REFERENCES "public"."person"("id") ON DELETE CASCADE
);
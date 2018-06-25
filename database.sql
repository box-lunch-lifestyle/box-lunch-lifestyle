CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    name VARCHAR (200) NOT NULL,
    get_emails BOOLEAN NOT NULL DEFAULT 'false',
    is_admin BOOLEAN NOT NULL DEFAULT 'false',
    date_joined DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES "public"."person"("id"),
    date_posted DATE NOT NULL DEFAULT NOW(),
    lunch_complete BOOLEAN NOT NULL DEFAULT 'false',
    life_complete BOOLEAN NOT NULL DEFAULT 'false',
    comments VARCHAR(2000)
);

CREATE TABLE positive_messages (
    id SERIAL PRIMARY KEY,
    message_content VARCHAR(400),
    message_type VARCHAR(80)
);
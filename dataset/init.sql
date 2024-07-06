CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.task
(
    id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    priority text NOT NULL,
    status text NOT NULL,
    "userId" uuid NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT "userId" FOREIGN KEY ("userId")
        REFERENCES users (id)
);
create extension if not exists "uuid-ossp";

create table cafes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null,
  logo_url text,
  location text not null
);

create table employees (
  id text primary key,
  name text not null,
  email_address text not null unique,
  phone_number text not null,
  gender text not null
);

create table employments (
  employee_id text references employees(id) unique,
  cafe_id uuid references cafes(id),
  start_date date not null
);

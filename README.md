A responsive web application built with next-js to let User type A (e.g. teacher/speaker) collect feedback from users of type B (e.g. audience). User type B can share their feedback anonymously in less than 30 seconds.

#Screenshots
![Group 28](https://user-images.githubusercontent.com/65610743/100673026-0b579480-3363-11eb-8115-a9655675664b.png)

#Style Guide
![Group 2 (1)](https://user-images.githubusercontent.com/65610743/100673515-dd268480-3363-11eb-9123-7766b60b657d.png)

# Project Plan

https://docs.google.com/spreadsheets/d/1caZhcuWzN1u0i26zU5BxitP3eqygxm1YQzY7vDRISqs/edit?usp=sharing
![image](https://user-images.githubusercontent.com/65610743/100672474-486f5700-3362-11eb-85b1-49dfd4e0d11f.png)

# Features

## Must-Haves

User A (teacher)

- [x] Signup / Login
- [x] Dashboard user/[username]
- [x] User not Found page
  - [x] Create new Survey (Name, Slug)
    - [x] Add Questions
      - [x] Pick question type (Premium Feature)
      - [x] Customize Question/Answers
    - [x] Edit Questions
    - [ ] Delete Questions (also when responses exists)
          ~~- [ ] Save Survey as Draft~~
          ~~- [ ] Publish Survey~~
  - [x] Get URL onClick
  - [x] View Survey Results (Statistics)
  - [ ] Delete Survey (also when questions exists)
- [x] Logout

User B (audience)

- [x] Open survey via URL
- [x] Fill out form
- [x] Thank you page on Submit

## Nice to Haves (work in progress)

User A

- [x] Redirect on Login (Authentication - User Login - 1:50:00)
- [ ] Reset Password
- [ ] Duplicate Survey
- [ ] Filter results by date (from dd.mm.yy to dd.mm.yy)
- [ ] Create own template
- [ ] Fancy UI for statistics & charts
- [x] optimize design also for web
- [ ] Edit survey name + URL
- [ ] Cookie & Privacy settings
- [ ] accept terms and conditions
- [ ] double opt in via mail

User B
Landingpage elements to interact live with USER A

- [ ] "Let's have a break" - Button
- [ ] Input Field to submit a question/comment
- [ ] Button to Start Survey
- [ ] See survey results after submit
- [x] optimize design also for web
- [ ] set a cookie to let every user participate only once

## Database

- [x] Define Structure
- [x] Create a PostgreSQL database and table(s)
- [x] Connect to and query information from database

![image](https://user-images.githubusercontent.com/65610743/97878662-34aee180-1d1f-11eb-94ed-89349ab5f74c.png)

ENUM question_type {
x_slider
y_slider
gauge
binary
}

## Tests

- [ ] E2E - Cypress (in progress)
- [ ] Unit Tests - Jest (in progress)

## TypeScript / JSDoc

- [x] for all major components

## Deploying

- [x] Deployed to Heroku https://myquicksy.herokuapp.com/

![Group 29](https://user-images.githubusercontent.com/65610743/100673159-43f76e00-3363-11eb-8733-307b83de207f.png)

# Technologies used

- Next.js
- Postgres.js
- Jest
- Cypress.io
- GitHub Actions

# Libraries used

- emotion/core
- nextcookies
- camelcase-keys
- ley
- dotenv
- recharts

# Setup Instructions

### Database Setup

Install postgres on your machine: https://www.postgresql.org/

Start postgres

```
postgres
```

Login with super-User on Windows:
`psql -U postgres postgres`
on mMac:
`psql postgres`

Setup new user and new database

```
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Connect to the database using new user

quit psql
`\q`
and reconnect with newly created user
`psql -U <user name> <database name>;`

Rename `example.env` to `.env` and insert your data

```
\_PGHOST=<localhost>
\_PGDATABASE=<database_name>
\_PGUSER=<user_name>
\_PGPASSWORD=<password>
\_CSRF_TOKEN_SECRET=<secret_token>
```

Add `.env` to .gitignore!

### Migrations

Running the migrations
To set up the structure and the content of the database, run the migrations using Ley:

`yarn migrate up`
To reverse the last single migration, run:

`yarn migrate down`

### Start Server

`_npm run dev_`

or

`_yarn dev_`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deployment instructions

Deploy on Heroku https://dashboard.heroku.com/

- create a new app
- Connect to your Github Repo
- Install the Heroku Postres Add-on
- Deploy

# Tests

## Jest

`_yarn jest_`

## Cypress

`yarn cypress start`

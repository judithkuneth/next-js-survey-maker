A web application (design mobile-first) built with next-js to let User type A (e.g. teacher/speaker) collect feedback from users of type B (e.g. audience). User type B can share their feedback anonymously in less than 30 seconds.

# Project Plan

https://docs.google.com/spreadsheets/d/1caZhcuWzN1u0i26zU5BxitP3eqygxm1YQzY7vDRISqs/edit?usp=sharing

![image](https://user-images.githubusercontent.com/65610743/97443849-cbe4f500-192b-11eb-975f-8b9a507d9318.png)

# Features

## Must-Haves

User A (teacher)

- [x] Signup / Login
- [ ] Logout
- [ ] My Surveys-Overview (Dashboard)
  - [ ] Create new Survey (Name, Description)
    - [ ] Add a Question
      - [ ] Pick a template
      - [ ] Customize Question/Answers
    - [ ] Edit and Delete Questions
    - [ ] Save Survey as Draft
    - [ ] Publish Survey
  - [ ] Share Survey via URL
  - [ ] View Survey Results (Statistics)
  - [ ] Delete Survey
  - [ ] Edit Survey if not yet published (Name/URL/Questions)
- [ ] Logout

User B (audience)

- [ ] Open survey via URL
- [ ] Fill out form
- [ ] Thank you page on Submit

## Nice to Haves

User A

- [ ] Redirect on Login (Authentication - User Login - 1:50:00)
- [ ] Reset Password
- [ ] Duplicate Survey
- [ ] Filter results by date (from dd.mm.yy to dd.mm.yy)
- [ ] Create own template
- [ ] Fancy UI for statistics & charts
- [ ] custom URL
- [ ] optimize design also for web
- [ ] Edit survey name(URL) and questions also after publishing (?)

User B
Landingpage elements to interact live with USER A

- [ ] "Let's have a break" - Button
- [ ] Input Field to submit a question/comment
- [ ] Button to Start Survey
- [ ] See survey results after submit
- [ ] optimize design also for web
- [ ] set a cookie to let every user participate only once

## Database

- [x] Define Structure
- [x] Create a PostgreSQL database and table(s)
- [x] Connect to and query information from this database

![image](https://user-images.githubusercontent.com/65610743/97878662-34aee180-1d1f-11eb-94ed-89349ab5f74c.png)

ENUM question_type {
x_slider
y_slider
gauge
binary
}

## Tests

- [ ] E2E - Cypress
- [ ] Unit Tests - Jest

## Getting Started

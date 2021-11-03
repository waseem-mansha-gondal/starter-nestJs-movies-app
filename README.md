


![Nest](uploads/logo.png)
## Description

We have created a demo aap of [Nest](https://github.com/nestjs/nest) that demonstrates the CURD of user and movies and all associate entities and we have integrated the following technology in our app.

### Technologies implemented:
-   [Nest](https://Nestjs.io/)
-   [PostgreSQL](https://www.postgresql.org/) + [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (ORM)
-   [JWT TOKEN](https://jwt.io/)
-   [Swagger](https://swagger.io/)
-   [OAuth](https://oauth.net/)

## Prerequisites

-   [Node.js](https://nodejs.org/) (>= 14.14.36)
-   [npm](https://www.npmjs.com/) (>= 6.5.0)


## Key Feature
- Movie CRUD
- User Authentication
- User profile
- Social logins
- Author,Actor, geners and ProductionHouse CURDS
- rating and review of movies

## Code Structure
  we tried to implement the best practice of code structure in our project following are the example
 
 #### all code go in src folder
  - src/core/databse/*ts
  - src/middlewares/*.ts
  - src/modules/* /*.module.ts
  - src/modules/* /*.service.ts
  - src/modules/* /*.controllers.ts
  - src/modules/* /*.provider.ts
 #### swagger documentation 
  - documentation/*
 #### all java script files will build in this dist folder
  - dist/*

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

| env             |     DummyData      |
|---------------------|---------------|
| DB_HOST             | dbhost        |
| DB_PORT             | PORT          |
| DB_USER             | USER|
| DB_PASS             | PASS  |
| DB_DIALECT          | postgres      |
| DB_NAME_TEST        | dbName        |
| DB_NAME_DEVELOPMENT | dbName        |
| DB_NAME_PRODUCTION  | dbName        |
| JWTKEY              | JWTSecret        |
| TOKEN_EXPIRATION    | Time         |
| BEARER              | Bearer        |
| GOOGLE_SECRET       | GOOGLE_SECRET |
| CLIENT_ID           | CLIENT_ID     |
| APP_ID              | APP_ID        |
| APP_SECRET          | APP_SECRET    |


## How to Setup

#### Step 1: git clone this repo.

#### Step 2: cd to the cloned repo.

#### Step 4: Make sure you add the requires env in .env file check .env.example for help

#### Step 3: Install the npm modules required for the project with npm install


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```




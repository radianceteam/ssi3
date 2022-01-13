

## Description

[NestJS](https://github.com/nestjs/nest)  codebase containing ssi API
Backend for interacting with the contract in the Everscale network. Checking for the existence of a document did for SSI ((Self-Sovereign Identity)). Gives the JWT token to the Frontend for authorization, checks whether the private key belongs to the user.
## Installation
Clone the repository
```bash
$ git clone https://github.com/
```
Switch to the repo folder
```bash
$ cd everscale-ssi-api
```
Install dependencies
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

## Database

The codebase contains examples of two different database abstractions, namely [TypeORM](https://typeorm.io/#/) and [PostgreSQL](https://www.postgresql.org/).

The branch master implements TypeORM with a mySQL database.


### TypeORM

Create a new mysql database with the name everscale-ssi
(or the name you specified in the ormconfig.json)

Copy TypeORM config example file for database settings
```bash

import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your-mysql-username",
    password: 'your-mysql-password',
    database: 'everscale-ssi', 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    }
};

export default config;
```

Start local mysql server and create new database 'everscale-ssi'

Run in console command, tables for all entities will be created.

```bash
$ npm run db:create
```

## API Specification

### Authentication:

* Signature to confirm the private key

/auth

Example request body:

```bash
{
    "user":
    {
        "did": "did"
    }
}
```
Required fields: did

returns a 'value' to be verify string

____
* Signature Hex Verification

/auth/login

Example request body:

```bash
{
    "user":
    {
        "signatureHex":"signatureHex",
        "did": "did"
}
}
```
Required fields: signatureHex, did

returns a value to JSON Web Token (JWT)

You can read the authentication header from the headers of the request

Authorization: Token jwt.token.here

____

* Signature to confirm the JWT token

/auth/user/id

returns true if the user is found id and did
____


* Did document contract address

/auth/didadrr

Example request body:

```bash
{
    "user":
    {
        "did": "did"
    }
}
```
Required fields: address

returns did document contract address

____
* Did document

/auth/diddoc

Example request body:

```bash
{
    "user":
    {
        "addr": "addr"
    }
}
```
Required fields: did

returns did document
____

## Authentication
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the Authorization header with Token scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.


## Description

[NestJS](https://github.com/nestjs/nest)

Backend of integration example with DID authentication (include demo QR Code authentication)
There is a demo web application (Backend) that shows DID integration. The site implements authentication using DID.

## Installation
Clone the repository
```bash
$ git clone https://github.com/radianceteam/ssi3.git
```
Switch to the repo folder
```bash
$ cd ssi3/api
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

returns true if the user is found (boolean)
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

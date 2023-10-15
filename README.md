# API documentation for a Hospital Appointment Scheduler

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Implementation details](#implementation-details)
4. [Endpoints & Routes](#endpoints--routes)
   - [User endpoints](#user-endpoints)
   - [User authentication routes](#user-authentication-routes)
   - [Specialization endpoints](#specialization-endpoints)
   - [Disease endpoints](#disease-endpoints)
   - [Appointment endpoints](#appointment-endpoints)
5. [Installation](#installation)
6. [Dockerization](#dockerization)

## Description

This API is an Hospital Appointment Scheduler REST API built with Node.js, using the Model–View–Controller (MVC) architectural pattern. It allows users to book, update, retrieve and delete appointments with doctors. Users need to be authenticated to access these features, ensuring that all appointment routes are secure.

## Technologies

- JavaScript
- Node.js (Express Framework)
- JSON Web Token (authentication)
- MongoDB (Database)
- Docker container

## Implementation details

Base URL: http://localhost:3000/

This API follows a RESTful principles, providing endpoints for the standard CRUD operations: create, read, update, and delete.The API is versioned with "api/v1/" as the prefix.

## Endpoints & Routes

### User endpoints

- **GET** __`api/v1/users`__ - Get all users.
- **GET** __`api/users/:id`__ - Get a user.
- **PUT** __`api/users/:id`__ - Update a user.
- **DELETE** __`api/users/:id`__ - Delete a user.


### User authentication routes

- **GET** __`api/v1/users/signup`__ - Render the sign-up page.
- **GET** __`api/v1/users/login`__ - Render the log-in page.
- **POST** __`api/v1/users/signup`__ - Handle user sign-up and create a new user.
- **POST** __`api/v1/users/login`__ - Handle user log-in.
- **GET** __`api/v1/users/logout`__ - Handle user logout and invalidate the JSON Web Token (JWT).

### Specialization endpoints

- **GET** __`api/v1/specializations`__ - Get all specializations.
- **GET** __`api/specializations/:id`__ - Get a specialization.
- **POST** __`api/specializations`__ - Create a new specialization.
- **PUT** __`api/specializations/:id`__ - Update a specialization.
- **DELETE** __`api/specializations/:id`__ - Delete a specialization.

### Disease endpoints

- **GET** __`api/v1/diseases`__ - Get all diseases.
- **GET** __`api/diseases/:id`__ - Get a disease.
- **POST** __`api/diseases`__ - Create a new disease.
- **PUT** __`api/diseases/:id`__ - Update a disease.
- **DELETE** __`api/diseases/:id`__ - Delete a disease.

### Appointment endpoints

- **GET** __`api/v1/appointments`__ - Retrieves a list of all appointments. (Requires JWT Authentication)
- **GET** __`api/v1/appointments/:id`__ - Retrieves the details of a specific appointment. (Requires JWT Authentication)
- **POST** __`api/v1/appointments`__ - Creates a new appointment. (Requires JWT Authentication)
- **PUT** __`api/v1/appointments/:id`__ - Updates the details of a specific appointment. (Requires JWT Authentication)
- **DELETE** __`api/v1/appointments/:id`__ - Deletes a specific appointment. (Requires JWT Authentication)


## Installation

Node.js needs to be installed on your machine.

Clone this repo with command

```
git clone git@github.com:AnastasiiaYaM/HospitalAppointmentAPI.git
```

Go to project folder

```
cd HospitalAppointmentAPI
```

Install dependencies

```
npm install
```

## Dockerization

For running application in Docker container you should have docker installed on your machine

Run app

```
docker compose up
```

Stop App

```
docker compose down
```

[⬆ Go Up ⬆](#go-up)

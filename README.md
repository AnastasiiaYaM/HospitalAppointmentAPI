# API documentation for a Hospital Appointment Scheduler

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Implementation details](#implementation-details)
4. [Endpoints & Routes](#endpoints--routes)
   - [User endpoints](#user-endpoints)
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

- **Request GET** __`/users`__ - Get all users.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "id": "1",
      "role_id": "1",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
    },
    {
      "id": "2",
      "role_id": "2",
      "email": "Ivana@gmail.com",
      "first_name": Ivan",
      "last_name: "Vakulenko",
    },
    ...
    ]
```

- **Request GET** __`/users/{userId}`__ - Get a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `userId`  | string | Yes      | The user ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === userId exists:

    200 OK success status response
    
    [{
      "id": "{userId}",
      "role_id": "1",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
    }]

    If userId is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid user ID."
    }]

    If the record with id === userId doesn't exist:

   404 Not Found
    
    [{
      "error": "User not found."
    }]
```

- **Request POST** __`users`__ - create a new user (id will be added automatically).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `email`  | string | Yes      |  User's email. |
| `first_name`  | string | Yes      | User's first name. |
| `last_name`  | string | Yes      |  User's last name. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "id": "3",
      role_id: "3",
      "email": "kolpakov@gmail.com",
      "first_name": "Oleg",
      "last_name": "Kolpakov"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PUT** __`users/{userId}`__ - Update user's properties.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `last_name`  | string | Yes      | Change the last name from "Vakulenko" to "Kopytko". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "User account with ID {userID} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid email address format"
  }]
```

- **Request DELETE** __`users/{userId}`__ - Delete a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      | The user ID to delete user's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "User account with ID {userID} has been deleted successfully"
  }]

  400 Bad Request: if the userId parameter is invalid.
  [{
    "error": "Invalid user ID"
  }]

  404 Not Found: if the record with the given userId does not exist in the database.
  [{
    "error": "User ID does not exist"
  }]

```
- **Request GET** __`/doctors`__ - Get all doctors.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "id": "1",
      "user_id": "Doctor",
      "specialty": "Pulmonology",
      "availability_day": "18.10.2023",
      "availability_hours": "9.00 - 13.00"
    },
    {
      "id": "3",
      "user_id": "Doctor",
      "specialty": "Cardiologist",
      "availability_day": "18.10.2023",
      "availability_hours": "9.00 - 13.00"
    },
    ...
    ]
```

- **Request GET** __`/doctors/{specialty}`__ - filter doctors by specialty.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty`  | string | Yes      | Doctor's specialty. |


**Response**: 
Content-Type: application/json.

```
   
    200 OK success status response
    
    [{
      "id": "3",
      "user_id": "Doctor",
      "specialty": "Cardiologist",
      "availability_day": "18.10.2023",
      "availability_hours": "9.00 - 13.00",
      "available": "true"
    }]

    404 Not Found
    
    [{
      "error": "Specialty does not found."
    }]
```
- **Request GET** __`/diseases{title}`__ - filter diseases by title.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `title`  | string | Yes      | Disease title. |


**Response**: 
Content-Type: application/json.

```
    200 OK success status response
    
    [{
      "id": "1",
      "title": "pneumonia",
      "specialty_id": "1",
      "specialty_title": "Pulmonologist",
    }]

    404 Not Found
    
    [{
      "error": "Disease does not found."
    }]
```

### Appointment endpoints

- **Request GET** __`/appointments`__ - Retrieves a list of all appointments. (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "id": "2",
      "patient_id": "1",
      "doctor_id": "3",
      "date": "20.10.2023",
      "start: "9.00",
      "end: "9.30"
    },
       {
      "id": "2",
      "patient_id": "1",
      "doctor_id": "1",
      "date": "20.10.2023",
      "start: "9.30",
      "end: "10.00"
    },
    ...
    ]
```

- **Request GET** __`/appointments/{appointmentId}`__ - Retrieves the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointmentId`  | string | Yes      | The appointment ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === appointmentId exists:

    200 OK success status response
    
    [{
      "id": "2",
      "patient_id": "1",
      "doctor_id": "1",
      "date": "20.10.2023",
      "start: "9.30",
      "end: "10.00"
    }]

    If appointmentId is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid appointment ID."
    }]

    If the record with id === appointmentId doesn't exist:

   404 Not Found
    
    [{
      "error": "Appointment does not found."
    }]
```

- **Request POST** __`appointments`__ - Creates a new appointment (id will be added automatically). (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `patient_id`  | string | Yes      |  Patient ID. |
| `doctor_id`  | string | Yes      | Doctor ID. |
| `date`  | string | Yes      |  Appointment's date. |
| `start`  | string | Yes      |  Time when appointment starts. |
| `end`  | string | Yes      |  Time when appointment ends. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
   [{
      "id": "2",
      "patient_id": "1",
      "doctor_id": "1",
      "date": "20.10.2023",
      "start: "11.30",
      "end: "12.00"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PUT** __`appointments/{appointmentId}`__ - Updates the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointmentId`  | string | Yes      | The appointment ID for change settings. |
| `date`  | string | Yes      | Change the date from "20.10.2023" to "21.10.2023". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Appointment with ID {appointmentId} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid date format"
  }]

     404 Not Found
    
    [{
      "error": "This date does not found."
    }]
```

- **Request DELETE** __`appointments/{appointmentId}`__ - Delete a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointmentId`  | string | Yes      | The appointment ID to delete this appointment. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Appointment with ID {appointmentID} has been deleted successfully"
  }]

  400 Bad Request: if the appointmentId parameter is invalid.
  [{
    "error": "Invalid appointment ID"
  }]

  404 Not Found: if the record with the given appointmentId does not exist in the database.
  [{
    "error": "Appointment ID does not exist"
  }]

```

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

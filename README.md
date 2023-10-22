# API documentation for a Hospital Appointment Scheduler

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Implementation details](#implementation-details)
4. [Endpoints & Routes](#endpoints--routes)
     - [User endpoints](#user-endpoints)
     - [Specialty endpoints](#specialty-endpoints)
     - [Disease endpoints](#disease-endpoints)
     - [Appointment endpoints](#appointment-endpoints)
     - [Verification endpoints](#verification-endpoints)
     - [Review endpoints](#review-endpoints)
     - [Conflict endpoints](#conflict-endpoints)
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

- **Request GET** __`/users`__ - Get all users (for Admin).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
    {
      "user_id": "1",
      "role": "Admin",
      "email": "admin@gmail.com",
      "first_name": Admin",
      "last_name: "Admin",
    },
    {
      "user_id": "2",
      "role": "Doctor",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
      "specialty_id": "Pulmonology",
      "working hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
    },
    {
      "user_id": "3",
      "role": "Patient",
      "email": "Ivana@gmail.com",
      "first_name": Ivan",
      "last_name: "Vakulenko",
    },
    ...
    ]
```

- **Request GET** __`/users{role='Doctor'}`__ - Get all doctors.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "user_id": "2",
      "role": "Doctor",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
      "specialty_id": "Pulmonology",
      "working hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
    },
    ...
    ]
```

- **Request GET** __`/users/{user_Id}`__ - Get a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_Id`  | string | Yes      | The user ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === user_Id exists:

    200 OK success status response
    
    [{
      "user_id": "{user_Id}",
      "role": "Doctor",
      "email": "olena@gmail.com",
      "first_name": "Olena",
      "last_name: "Vakulenko",
      "specialty_id": "Pulmonology",
      "working hours": "{"Mon": "{ open: 9, close: 11 }", "Tue": "{ open: 11, close: 13 }", "Wed": "{ open: 9, close: 11 }", "Thu": "{ open: 11, close: 13 }", "Fri": "{ open: 13, close: 17 }", "Sat": "{ open: 9, close: 11 }", "Sun": "{ open: 11, close: 13 }"}",
    }]

    If user_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid user ID."
    }]

    If the record with id === user_Id doesn't exist:

   404 Not Found
    
    [{
      "error": "User not found."
    }]
```

- **Request POST** __`/users`__ - create a new user (id will be added automatically).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `role`  | string | Yes      |  User's role ('Doctor', 'Patient' or 'Admin'). |
| `email`  | string | Yes      |  User's email. |
| `first_name`  | string | Yes      | User's first name. |
| `last_name`  | string | Yes      |  User's last name. |
| `specialty_id`  | string | Yes      |  Doctor's specialty (for Doctor's role). |
| `working hours`  | string | Yes      |  Doctor's availability (for Doctor's role). |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "user_id": "4",
      role: "Doctor",
      "email": "kolpakov@gmail.com",
      "first_name": "Oleg",
      "last_name": "Kolpakov",
      "specialty_id": "Cardiology",
      "working hours": "{"Mon": "{ open: 9, close: 13 }", "Tue": "{ open: 13, close: 17 }", "Wed": "{ open: 9, close: 13 }", "Thu": "{ open: 13, close: 17 }", "Fri": "{ open: 9, close: 13 }", "Sat": "{ open: 13, close: 17 }", "Sun": "{ open: 11, close: 14 }"}"
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

- **Request PATCH** __`/users/{user_Id}`__ - Update user's properties.

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

- **Request DELETE** __`/users/{user_Id}`__ - Delete a user.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id`  | string | Yes      | The user ID to delete user's account. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "User account with ID {user_ID} has been deleted successfully"
  }]

  400 Bad Request: if the user_Id parameter is invalid.
  [{
    "error": "Invalid user ID"
  }]

  404 Not Found: if the record with the given user_Id does not exist in the database.
  [{
    "error": "User ID does not exist"
  }]

```

### Specialty endpoints

- **Request GET** __`/specialties{specialty_title}`__ - filter doctors by specialty.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `specialty_title`  | string | Yes      | Doctor's specialty. |


**Response**: 
Content-Type: application/json.

```
    200 OK success status response
    
    [{
      "specialty_id": "2",
      "specialty_title": "Cardiology",
      "user_id {"role": "Doctor"}": "4", 
      "first_name": "Oleg",
      "last_name": "Kolpakov",  
      "disease_id": "2"
    }]

    404 Not Found
    
    [{
      "error": "Specialty does not found."
    }]
```

### Disease endpoints

- **Request GET** __`/diseases`__ - Get all diseases.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "disease_id": "1",
      "disease_title": "pneumonia",
      "specialty_id": "1",
      "specialty_title": "Pulmonology",
    },
     {
      "disease_id": "2",
      "disease_title": "hypertension",
      "specialty_id": "2",
      "specialty_title": "Cardiology",
    },
    ...
    ]
```

- **Request GET** __`/diseases/{disease_id}`__ -  Get a disease.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The disease ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === disease_id exists:

    200 OK success status response
    
    [{
      "disease_id": "{disease_id}",
      "disease_title": "pneumonia",
      "specialty_id": "1",
      "specialty_title": "Pulmonology"
    }]

    If disease_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid disease ID."
    }]

    If the record with id === disease_id doesn't exist:

   404 Not Found
    
    [{
      "error": "User not found."
    }]
```

- **Request POST** __`diseases`__ - create a new disease (id will be added automatically) (for Admin).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_title`  | string | Yes      |  The disease title. |
| `specialty_id`  | string | Yes      |  Doctor's specialty who can treat this disease. |
| `specialty_title`  | string | Yes      |  Doctor's specialty. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "disease_id": "2",
      "disease_title": COPD",
      "specialty_id": "1",
      "specialty_title": "Pulmonology"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize like Admin:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/diseases/{disease_id}`__ - Update disease's properties.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `disease_title`  | string | Yes      | Change the diseases's title from "COPD" to "chronic obstructive pulmonary disease". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Disease entity with ID {disease_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid input data format"
  }]
```

- **Request DELETE** __`/diseases/{disease_id}`__ - Delete a disease.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `disease_id`  | string | Yes      | The disease ID to delete disease's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Disease entity with ID {disease_id} has been deleted successfully"
  }]

  400 Bad Request: if the disease_id parameter is invalid.
  [{
    "error": "Invalid disease ID"
  }]

  404 Not Found: if the record with the given disease_id does not exist in the database.
  [{
    "error": "Disease ID does not exist"
  }]

```

### Appointment endpoints

- **Request GET** __`/appointments`__ - Retrieves a list of all appointments. (Requires JWT Authentication).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "appointment_id": "2",
      "user_id {"role": "Patient"}": "3",
      "user_id {"role": "Doctor"}": "2",
      "date": "20.10.2023",
      "start: "9.00",
      "end: "9.30"
    },
       {
      "appointment_id": "2",
      "user_id {"role": "Patient"}": "3",
      "user_id {"role": "Doctor"}": "4",
      "date": "20.10.2023",
      "start: "9.30",
      "end: "10.00"
    },
    ...
    ]
```

- **Request GET** __`/appointments/{appointment_Id}`__ - Retrieves the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === appointment_Id exists:

    200 OK success status response
    
    [{
      "id": "2",
      "user_id {"role": "Patient"}": "3",
      "user_id {"role": "Doctor"}": "2",
      "date": "20.10.2023",
      "start: "9.30",
      "end: "10.00"
    }]

    If appointment_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid appointment ID."
    }]

    If the record with id === appointment_Id doesn't exist:

   404 Not Found
    
    [{
      "error": "Appointment does not found."
    }]
```

- **Request POST** __`appointments`__ - Creates a new appointment (id will be added automatically). (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id {"role": "Patient"}`  | string | Yes      |  Patient ID. |
| `user_id {"role": "Doctor"}`  | string | Yes      | Doctor ID. |
| `date`  | string | Yes      |  Appointment's date. |
| `start`  | string | Yes      |  Time when appointment starts. |
| `end`  | string | Yes      |  Time when appointment ends. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
   [{
      "appointment_id": "2",
      "user_id {"role": "Patient"}": "3",
      "user_id {"role": "Doctor"}": "4",
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

- **Request PUT** __`appointments/{appointment_Id}`__ - Updates the details of a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID for change settings. |
| `date`  | string | Yes      | Change the date from "20.10.2023" to "21.10.2023". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Appointment with ID {appointment_Id} has been updated successfully"
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

- **Request DELETE** __`appointments/{appointment_Id}`__ - Delete a specific appointment. (Requires JWT Authentication).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `appointment_Id`  | string | Yes      | The appointment ID to delete this appointment. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Appointment with ID {appointment_ID} has been deleted successfully"
  }]

  400 Bad Request: if the appointment_Id parameter is invalid.
  [{
    "error": "Invalid appointment ID"
  }]

  404 Not Found: if the record with the given appointmentId does not exist in the database.
  [{
    "error": "Appointment ID does not exist"
  }]

```
### Verification endpoints

- **Request GET** __`/verifications`__ - Get all verifications (for Admin).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "verification_id": "1",
      "user_id {"role": "Doctor"}": "2",
      "user_id {"role": "Admin"}": "1",
      "status": "approved",
      "date: "19.10.2023",
      "notes": "licence from 01.11.2016",
    },
   {
      "verification_id": "2",
      "user_id {"role": "Doctor"}": "4",
      "user_id {"role": "Admin"}": "1",
      "status": "approved",
      "date: "19.10.2023",
      "notes": "licence from 17.07.2014",
    },
    ...
    ]
```

- **Request GET** __`/verifications/{verification_id}`__ - Get a verification by ID (for Doctor and Admin).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `verification_id`  | string | Yes      | The verification ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === verification_id exists:

    200 OK success status response
    
    [{
      "verification_id": "{verification_id}",
      "user_id {"role": "Doctor"}": "2",
      "user_id {"role": "Admin"}": "1",
      "status": "approved",
      "date: "19.10.2023",
      "notes": "licence from 01.11.2016"
    }]

    If verification_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid verification ID."
    }]

    If the record with id === verification_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Verification not found."
    }]
```

- **Request POST** __`/verifications`__ - create a new verification_id (id will be added automatically) (for Admin).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id {"role": "Doctor"}`  | string | Yes      | Doctor ID. |
| `user_id {"role": "Admin"}`  | string | Yes      | Admin ID. |
| `Status`  | string | Yes      |  Approvement status. |
| `Date`  | string | Yes      | Date when an Admin create this verification. |
| `Notes`  | string | Yes      |  Additional info about verification. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "verification_id": "3",
      "user_id {"role": "Doctor"}": "5",
      "user_id {"role": "Admin"}": "1",
      "status": "not approved",
      "date: "19.10.2023",
      "notes": "the data to verify is not enough: licence: {false}"
    }]

    If the request body does not contain required fields:
    400 Bad Request
    [{
      "error": "Invalid data."
    }]

    If the user does not authorize as Admin:
    401 Unauthorized
    [{
      "error": "Authorization required."
    }]
```

- **Request PATCH** __`/verifications/{verification_id}`__ - Update verification's properties (for Admin).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `verification_id`  | string | Yes      | The verification ID for change properties in necessary entity. |
| `notes`  | string | Yes      | Change the notes from "the data to verify is not enough: licence: {false}" to "licence from 15.09.2023". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Verification entity with ID {verification_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid input data format"
  }]
```

- **Request DELETE** __`/verifications/{verification_id}`__ - Delete a verification.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `verification_id`  | string | Yes      | The verification ID to delete verification's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Verification entity with ID {verification_id} has been deleted successfully"
  }]

  400 Bad Request: if the verification_id parameter is invalid.
  [{
    "error": "Invalid verification ID"
  }]

  404 Not Found: if the record with the given verification_id does not exist in the database.
  [{
    "error": "Verification ID does not exist"
  }]

```

### Review endpoints

- **Request GET** __`/reviews`__ - Get all users.

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "review_id": "1",
      "user_id {"role": "Doctor"}": "2",
      "user_id {"role": "Patient"}": "3",
      "appointment_id": "1",
      "rate": "5 stars",
      "message": "Olena Kopytko in five days managed my pneumonia! exellent Doctor",
    },
    {
      "review_id": "2",
      "user_id {"role": "Doctor"}": "4",
      "user_id {"role": "Patient"}": "3",
      "appointment_id": "2",
      "rate": "3 stars",
      "message": "Unfortunately, my blood pressure remains uncontrolled. Despite the fact that the doctor was kind to me.",
    },
    ...
    ]
```

- **Request GET** __`/reviews/{review_id}`__ - Get a review by ID.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The review ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === review_id exists:

    200 OK success status response
    
    [{
      "review_id": "{review_id}",
      "user_id {"role": "Doctor"}": "2",
      "user_id {"role": "Patient"}": "3",
      "appointment_id": "1",
      "rate": "5 stars",
      "message": "Olena Kopytko in five days managed my pneumonia! exellent Doctor"
    }]

    If review_Id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid review ID."
    }]

    If the record with id === review_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Review not found."
    }]
```

- **Request POST** __`/reviews`__ - create a new review (id will be added automatically) (for authorised user who has already had an appointment).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id {"role": "Doctor"}`  | string | Yes      | Doctor ID. |
| `user_id {"role": "Patient"}`  | string | Yes      | Patient ID. |
| `appointment_id`  | string | Yes      | Appointment ID. |
| `rate`  | string | Yes      |  Appointment's rate. |
| `message`  | string | Yes      |  Review message. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "review_id": "3",
      "user_id {"role": "Doctor"}": "4",
      "user_id {"role": "Patient"}": "3",
      "appointment_id": "3",
      "rate": "5 stars",
      "message": "I am satisfied with the results"
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

- **Request PATCH** __`/reviews/{review_id}`__ - Update review's properties.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `user_id {"role": "Doctor"}`  | string | Yes      | Change the user ID name from "4" to "2". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Review entity with ID {review_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid user ID format"
  }]
```

- **Request DELETE** __`/reviews/{review_id}`__ - Delete a review.

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `review_id`  | string | Yes      | The review ID to delete review's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Review's entity with ID {review_id} has been deleted successfully"
  }]

  400 Bad Request: if the review_id parameter is invalid.
  [{
    "error": "Invalid review ID"
  }]

  404 Not Found: if the record with the given review_id does not exist in the database.
  [{
    "error": "Review ID does not exist"
  }]

```

### Conflict endpoints

- **Request GET** __`/conflicts`__ - Get all conflicts (for Admin).

**Response**: 200 OK success status response.
Content-Type: application/json.
```
   [
   {
      "conflict_id": "1",
      "user_id {"role": "Admin"}": "1",
      "user_id {"role": "Doctor"}": "4",
      "user_id {"role": "Patient"}": "3",
      "appointment_id: 2",
      "reason": "bad treatment results",
      "status": "closed",
   },
    ...
    ]
```


- **Request GET** __`/conflicts/{conflict_id}`__ - Get a conflict by ID (for authorised user who has already had an appointment).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The user ID. |


**Response**: 
Content-Type: application/json.

```
    If the record with id === conflict_id exists:

    200 OK success status response
    
    [{
      "conflict_id": "1",
      "user_id {"role": "Admin"}": "1",
      "user_id {"role": "Doctor"}": "4",
      "user_id {"role": "Patient"}": "3",
      "appointment_id: 2",
      "reason": "bad treatment results",
      "status": "closed"
    }]

    If conflict_id is invalid (not uuid):

    400 Bad Request

    [{
      "error": "Invalid conflict ID."
    }]

    If the record with id === conflict_id doesn't exist:

   404 Not Found
    
    [{
      "error": "Conflict not found."
    }]
```

- **Request POST** __`/conflicts`__ - create a new conflict (id will be added automatically) (for authorised user who has already had an appointment).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `user_id {"role": "Admin"}`  | string | Yes      |  Admin ID. |
| `user_id {"role": "Doctor"}`  | string | Yes      |  Doctor ID. |
| `user_id {"role": "Patient"}`  | string | Yes      | Patient ID. |
| `appointment_id`  | string | Yes      |  Appointment ID. |
| `reason`  | string | Yes      |  The reason of the conflict. |
| `stasus`  | string | Yes      |  Conflict's status. |

**Response**: 
Content-Type: application/json.

```
    If the record was successfully created:
    201 Created
    [{
      "conflict_id": "2",
      "user_id {"role": "Admin"}": "1",
      "user_id {"role": "Doctor"}": "5",
      "user_id {"role": "Patient"}": "3",
      "appointment_id: 4",
      "reason": "My appointment was cancelled",
      "status": "open"
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

- **Request PATCH** __`/conflicts/{conflict_id}`__ - Update conflict's enyity properties (for authorised user who has already had an appointment).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The user ID for change properties in necessary account. |
| `user_id {"role": "Doctor"}`  | string | Yes      | Change the user ID name from "5" to "2". |

**Response**: 
Content-Type: application/json.

```
  200 OK success status response
  [{
    "message": "Conflict entity with ID {conflict_id} has been updated successfully"
  }]

  400 Bad Request
    [{
    "error": "Invalid user ID format"
  }]
```

- **Request DELETE** __`/conflicts/{conflict_id}`__ - Delete a conflict (for authorised user who has already had an appointment).

**Query Parameters**

| Parameter | Type   | Required | Description  |
|-----------|--------|----------|--------------|
| `conflict_id`  | string | Yes      | The conflict ID to delete conflict's entity. |

**Response**: 
Content-Type: application/json.

```
  204 No Content: if the record was found and deleted successfully
  [{
    "message": "Conflict entity with ID {conflict_id} has been deleted successfully"
  }]

  400 Bad Request: if the conflict_id parameter is invalid.
  [{
    "error": "Invalid conflict ID"
  }]

  404 Not Found: if the record with the given conflict_id does not exist in the database.
  [{
    "error": "Conflict ID does not exist"
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
